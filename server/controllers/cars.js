const Car = require('../models/car');
const { cloudinary } = require("../cloudinary");
const { formatDistanceStrict } = require('date-fns');


module.exports.getSearchCars = async (req, res) => {
    const searchQuery = req.body.search;

    const limit = 1;
    let page = req.query.page ? parseInt(req.query.page) : 0;

    if (searchQuery) {
            const allCars = await Car.aggregate([
                {
                    $search: {
                        index: 'stela',
                        text: {
                            path: {
                                'wildcard' : '*'
                            },
                            query: searchQuery,
                            fuzzy: {
                                maxEdits: 2,
                                prefixLength: 2
                            }
                        }
                    }
                },
            ]);
            const count = allCars.length;
            let pages;
            if (count % limit == 0) {
                pages = Math.floor(count / limit) - 1;
            } else {
                pages = Math.floor(count / limit);
            }

            res.json({ cars: allCars, limit, page, count, pages })
    }
    
}

module.exports.createCar = async (req, res) => {
    const car = new Car(req.body);
    car.carName = req.body.make + req.body.model;
    car.carFull = req.body.make + " " + req.body.model;
    car.imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    car.author = req.user._id;

    await car.save(); 
    console.log(car);
    return res.json('success');
}

module.exports.showCar = async (req, res) => {
    const car = await Car.findById(req.params.id)
    const date = new Date()
    const createdAt = car.createdAt;
    const formattedDate = formatDistanceStrict((date, createdAt), date, { addSuffix: true })

    res.json({ car, formattedDate })
}

module.exports.updateCar = async (req, res) => {
    try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body);
    const images = [];
    const carImages = req.files.map(f => ({ url: f.path, filename: f.filename }));
    car.imgs = car.imgs.concat(carImages);
    await car.save();

    if (req.body.deleted) {
        const deleteImages = req.body.deleted;
    
        if(deleteImages.length > 7) {
            images.push(deleteImages)
        } else {
            deleteImages.forEach(element => {
                images.push(element)
            });
        }
       
        for (let filename of images) {
            await cloudinary.uploader.destroy(filename);
        }
        await car.updateOne({ $pull: { imgs: { filename: { $in: images } } } });
    }

    } catch (e) {
        console.log(e)
    }
    
}

module.exports.deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findByIdAndDelete(id);
        for (let image of car.imgs) {
            await cloudinary.uploader.destroy(image.filename);
        } 
    } catch (error) {
        console.log(error)
    }
    
}
