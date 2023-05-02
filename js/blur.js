(function (imageproc) {
    "use strict";

    /*
     * Apply blur to the input data
     */
    imageproc.blur = function (inputData, outputData, kernelSize) {
        console.log("Applying blur...");

        // You are given a 3x3 kernel but you need to create a proper kernel
        // using the given kernel size
        /**
         * TODO: You need to extend the blur effect to include different
         * kernel sizes and then apply the kernel to the entire image
         */
        var kernel = null;
        switch (kernelSize) {
            case 3:
                kernel = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
                break;
            case 5:
                kernel = [
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1]
                ];
                break;
            case 7:
                kernel = [
                    [1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1]
                ];
                break;
            case 9:
                kernel = [
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                ];
                break;
            default:
                kernel = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
                break;
        }

        var rangeInKernelSize = Math.trunc(kernelSize / 2);
        console.log("Applying blur...", rangeInKernelSize);

        // Apply the kernel to the whole image
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                // Use imageproc.getPixel() to get the pixel values
                // over the kernel
                // Then set the blurred result to the output data
                var outputR = 0;
                var outputG = 0;
                var outputB = 0;
                for (var j = -rangeInKernelSize; j <= rangeInKernelSize; j++) {
                    for (var i = -rangeInKernelSize; i <= rangeInKernelSize; i++) {
                        var pixelValue = imageproc.getPixel(inputData, x + i, y + j);
                        var coefficients = kernel[j + rangeInKernelSize][i + rangeInKernelSize];
                        outputR += pixelValue.r * coefficients;
                        outputG += pixelValue.g * coefficients;
                        outputB += pixelValue.b * coefficients;
                    }
                }

                var index = (x + y * outputData.width) * 4;
                outputData.data[index] = outputR / (kernelSize * kernelSize);
                outputData.data[index + 1] = outputG / (kernelSize * kernelSize);
                outputData.data[index + 2] = outputB / (kernelSize * kernelSize);
            }
        }
    }

}(window.imageproc = window.imageproc || {}));
