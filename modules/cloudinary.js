var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'fixdstreets',
    api_key: '618731377869234',
    api_secret: 'skDItRJbv9qrVyTZUvbRpRONKiI'
});

module.exports.upload = function (imgPath, callback) {
    cloudinary.uploader.upload(imgPath, function (result) {
        console.log('Cloudinary photo uploaded result:');
        console.log(result);
        if (result) {
            callback(null, result);
        }
        else {
            callback('Error uploading to cloudinary');
        }
    });
};