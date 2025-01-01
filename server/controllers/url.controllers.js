const { updateMetric } = require('../services/matric.services');
const URLServices = require('../services/url.services')
const MatricServices = require('../services/matric.services')
const { uploadOnCloudinary } = require('../services/cloudinary.services')
const QRCode = require('qrcode');
const fs = require('fs')
const path = require('path');

exports.genrateURL = async (req, res) => {
    try {
        const originalURL = req.body.redirectUrl
        const createdBy = req.userId
        const data = await(URLServices.createURL(originalURL, createdBy));
        await MatricServices.createMetric(data._id);
        return res.send({ message: "Successfully url is genrated.", data: data })
    } catch (e) {
        throw Error("Error while genrating URL.")
    }
}

exports.generateQrcode = async (req, res) => {
    try {

        const urlId = req.params.id;
        const data = await URLServices.getURLbyId(urlId); // Await the promise
        // if(data.qrcode!==null) return res.send({ message: "QRCode already exist." })
        const shortId = data.shortId;
        const url = `http://localhost:3000/${shortId}`;
        const directoryPath = path.resolve(__dirname, '../public/qrcode');
        const filePath = path.resolve(directoryPath, 'file.png');


        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        await QRCode.toFile(filePath, url, {
            errorCorrectionLevel: 'H'
        });

        const qrCodeDataURL = await QRCode.toDataURL(url);

        const uploadResult = await uploadOnCloudinary(filePath);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        } else {
            console.error("File does not exist, cannot delete:", filePath);
        }

        console.log('QR code uploaded to Cloudinary:', uploadResult);
        console.log('QR code data URL:', qrCodeDataURL);

        const qrCodeUrl = uploadResult.secure_url;
        await URLServices.updateURLById(urlId, { qrcode: qrCodeUrl });


        return res.send({ uploadResult, qrCodeDataURL, data });
    } catch (error) {
        console.error("Error while generating QR code: ", error);
        res.status(500).json({ error: "Error while generating QR code" });
    }
};


exports.clickOnUrl = async (req, res) => {
    try {
        const shortId = req.params.shortId
        const url = await(URLServices.findURL(shortId));
        if (!url) return res.send({ message: "Something went wrong" })
        await updateMetric(url._id, req.headers['user-agent']);
        res.redirect(url.redirectUrl);
    } catch (e) {
        throw Error("Error while redirecting.")
    }
}



