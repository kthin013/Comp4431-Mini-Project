(function (imageproc) {
    "use strict";

    /*
     * Apply negation to the input data
     */
    imageproc.negation = function (inputData, outputData) {
        console.log("Applying negation...");

        for (var i = 0; i < inputData.data.length; i += 4) {
            outputData.data[i] = 255 - inputData.data[i];
            outputData.data[i + 1] = 255 - inputData.data[i + 1];
            outputData.data[i + 2] = 255 - inputData.data[i + 2];
        }
    }

    /*
     * Convert the input data to grayscale
     */
    imageproc.grayscale = function (inputData, outputData) {
        console.log("Applying grayscale...");

        /* TODO: You need to create the grayscale operation here */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Find the grayscale value using simple averaging
            var intensity = (inputData.data[i] + inputData.data[i + 1] + inputData.data[i + 2]) / 3;
            // Change the RGB components to the resulting value

            outputData.data[i] = intensity;
            outputData.data[i + 1] = intensity;
            outputData.data[i + 2] = intensity;
        }
    }

    /*
     * Applying brightness to the input data
     */
    imageproc.brightness = function (inputData, outputData, offset) {
        console.log("Applying brightness...");

        /* TODO: You need to create the brightness operation here */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Change the RGB components by adding an offset
            outputData.data[i] = inputData.data[i] + offset;
            outputData.data[i + 1] = inputData.data[i + 1] + offset;
            outputData.data[i + 2] = inputData.data[i + 2] + offset;

            // Handle clipping of the RGB components
            if (outputData.data[i] < 0) {
                outputData.data[i] = 0;
            }
            if (outputData.data[i] > 255) {
                outputData.data[i] = 255;
            }
            if (outputData.data[i + 1] < 0) {
                outputData.data[i + 1] = 0;
            }
            if (outputData.data[i + 1] > 255) {
                outputData.data[i + 1] = 255;
            }
            if (outputData.data[i + 2] < 0) {
                outputData.data[i + 2] = 0;
            }
            if (outputData.data[i + 2] > 255) {
                outputData.data[i + 2] = 255;
            }
        }
    }

    /*
     * Applying contrast to the input data
     */
    imageproc.contrast = function (inputData, outputData, factor) {
        console.log("Applying contrast...");

        /* TODO: You need to create the contrast operation here */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Change the RGB components by multiplying a factor

            outputData.data[i] = inputData.data[i] * factor;
            outputData.data[i + 1] = inputData.data[i + 1] * factor;
            outputData.data[i + 2] = inputData.data[i + 2] * factor;

            // Handle clipping of the RGB components
            if (outputData.data[i] > 255) {
                outputData.data[i] = 255;
            }
            if (outputData.data[i + 1] > 255) {
                outputData.data[i + 1] = 255;
            }
            if (outputData.data[i + 2] > 255) {
                outputData.data[i + 2] = 255;
            }
        }
    }

    /*
     * Make a bit mask based on the number of MSB required
     */
    function makeBitMask(bits) {
        var mask = 0;
        for (var i = 0; i < bits; i++) {
            mask >>= 1;
            mask |= 128;
        }
        return mask;
    }

    /*
     * Apply posterization to the input data
     */
    imageproc.posterization = function (inputData, outputData, redBits, greenBits, blueBits) {
        console.log("Applying posterization...");

        /* TODO: You need to create the posterization  operation here */

        // Create the red, green and blue masks
        // A function makeBitMask() is already given
        var bitmaskR = makeBitMask(redBits);
        var bitmaskG = makeBitMask(redBits);
        var bitmaskB = makeBitMask(redBits);

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Apply the bitmasks onto the RGB channels

            outputData.data[i] = inputData.data[i] & bitmaskR;
            outputData.data[i + 1] = inputData.data[i + 1] & bitmaskG;
            outputData.data[i + 2] = inputData.data[i + 2] & bitmaskB;
        }
    }

    /*
     * Apply threshold to the input data
     */
    imageproc.threshold = function (inputData, outputData, thresholdValue) {
        console.log("Applying thresholding...");

        /* TODO: You need to create the thresholding operation here */

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Find the grayscale value using simple averaging
            // You will apply thresholding on the grayscale value
            var intensity = (inputData.data[i] + inputData.data[i + 1] + inputData.data[i + 2]) / 3;
            // Change the colour to black or white based on the given threshold
            if (intensity > thresholdValue) {
                outputData.data[i] = 255;
                outputData.data[i + 1] = 255;
                outputData.data[i + 2] = 255;
            } else {
                outputData.data[i] = 0;
                outputData.data[i + 1] = 0;
                outputData.data[i + 2] = 0;
            }
        }
    }

    /*
     * Build the histogram of the image for a channel
     */
    function buildHistogram(inputData, channel) {
        var histogram = [];
        for (var i = 0; i < 256; i++)
            histogram[i] = 0;

        /* TODO: You need to build the histogram here */

        // Accumulate the histogram based on the input channel
        // The input channel can be:
        // "red"   - building a histogram for the red component
        // "green" - building a histogram for the green component
        // "blue"  - building a histogram for the blue component
        // "gray"  - building a histogram for the intensity
        //           (using simple averaging)
        switch (channel) {
            case "red":
                for (var i = 0; i < inputData.data.length; i += 4) {
                    histogram[inputData.data[i]] += 1;
                }
                break;
            case "green":
                for (var i = 0; i < inputData.data.length; i += 4) {
                    histogram[inputData.data[i + 1]] += 1;
                }
                break;
            case "blue":
                for (var i = 0; i < inputData.data.length; i += 4) {
                    histogram[inputData.data[i + 2]] += 1;
                }
                break;
            case "gray":
                for (var i = 0; i < inputData.data.length; i += 4) {
                    var grayScale = (inputData.data[i] + inputData.data[i + 1] + inputData.data[i + 2]) / 3;
                    histogram[grayScale] += 1;
                }
                break;
        }
        return histogram;
    }

    /*
     * Find the min and max of the histogram
     */
    function findMinMax(histogram, pixelsToIgnore) {
        var min = 0, max = 255;

        /* TODO: You need to build the histogram here */
        pixelsToIgnore = pixelsToIgnore / 2;

        var sumOfPixel = 0;
        // Find the minimum in the histogram with non-zero value by
        // ignoring the number of pixels given by pixelsToIgnore
        for (min = 0; min < 255; min++) {
            if (histogram[min] > 0) {
                sumOfPixel += histogram[min];
                if (sumOfPixel >= pixelsToIgnore)
                    break;
            }
        }

        // Find the maximum in the histogram with non-zero value by
        // ignoring the number of pixels given by pixelsToIgnore
        sumOfPixel = 0;
        for (max = 255; max > 0; max--) {
            if (histogram[max] > 0) {
                sumOfPixel += histogram[max];
                if (sumOfPixel >= pixelsToIgnore)
                    break;
            }
        }

        return { "min": min, "max": max };
    }

    /*
     * Apply automatic contrast to the input data
     */
    imageproc.autoContrast = function (inputData, outputData, type, percentage) {
        console.log("Applying automatic contrast...");

        // Find the number of pixels to ignore from the percentage
        var pixelsToIgnore = (inputData.data.length / 4) * percentage;

        var histogram, minMax;
        if (type == "gray") {
            // Build the grayscale histogram
            histogram = buildHistogram(inputData, "gray");
            // console.log(histogram.slice(0, 10).join(","));

            // Find the minimum and maximum grayscale values with non-zero pixels
            minMax = findMinMax(histogram, pixelsToIgnore);
            // console.log(minMax);

            var min = minMax.min, max = minMax.max, range = max - min;

            /* TODO: You need to apply the correct adjustment to each pixel */

            for (var i = 0; i < inputData.data.length; i += 4) {
                // Adjust each pixel based on the minimum and maximum values
                outputData.data[i] = (inputData.data[i] - min) / range * 255;
                outputData.data[i + 1] = (inputData.data[i + 1] - min) / range * 255;
                outputData.data[i + 2] = (inputData.data[i + 2] - min) / range * 255;

                if (outputData.data[i] < 0) {
                    outputData.data[i] = 0;
                }
                if (outputData.data[i] > 255) {
                    outputData.data[i] = 255;
                }
                if (outputData.data[i + 1] < 0) {
                    outputData.data[i + 1] = 0;
                }
                if (outputData.data[i + 1] > 255) {
                    outputData.data[i + 1] = 255;
                }
                if (outputData.data[i + 2] < 0) {
                    outputData.data[i + 2] = 0;
                }
                if (outputData.data[i + 2] > 255) {
                    outputData.data[i + 2] = 255;
                }
            }
        }
        else {

            /**
             * TODO: You need to apply the same procedure for each RGB channel
             *       based on what you have done for the grayscale version
             */
            var histogramRed = buildHistogram(inputData, "red");
            var minMaxRed = findMinMax(histogramRed, pixelsToIgnore);
            var minRed = minMaxRed.min, maxRed = minMaxRed.max, rangeRed = maxRed - minRed;

            var histogramGreen = buildHistogram(inputData, "green");
            var minMaxGreen = findMinMax(histogramGreen, pixelsToIgnore);
            var minGreen = minMaxGreen.min, maxGreen = minMaxGreen.max, rangeGreen = maxGreen - minGreen;

            var histogramBlue = buildHistogram(inputData, "blue");
            var minMaxBlue = findMinMax(histogramBlue, pixelsToIgnore);
            var minBlue = minMaxBlue.min, maxBlue = minMaxBlue.max, rangeBlue = maxBlue - minBlue;

            for (var i = 0; i < inputData.data.length; i += 4) {
                // Adjust each channel based on the histogram of each one
                outputData.data[i] = (inputData.data[i] - minRed) / rangeRed * 255;
                outputData.data[i + 1] = (inputData.data[i + 1] - minGreen) / rangeGreen * 255;
                outputData.data[i + 2] = (inputData.data[i + 2] - minBlue) / rangeBlue * 255;

                if (outputData.data[i] < 0) {
                    outputData.data[i] = 0;
                }
                if (outputData.data[i] > 255) {
                    outputData.data[i] = 255;
                }
                if (outputData.data[i + 1] < 0) {
                    outputData.data[i + 1] = 0;
                }
                if (outputData.data[i + 1] > 255) {
                    outputData.data[i + 1] = 255;
                }
                if (outputData.data[i + 2] < 0) {
                    outputData.data[i + 2] = 0;
                }
                if (outputData.data[i + 2] > 255) {
                    outputData.data[i + 2] = 255;
                }
            }
        }
    }

}(window.imageproc = window.imageproc || {}));
