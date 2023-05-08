(function (imageproc) {
    "use strict";
    var grayHistogram = null;
    var grayHistogram2 = null;
    var redHistogram = null;
    var greenHistogram = null;
    var blueHistogram = null;
    var redHistogram2 = null;
    var greenHistogram2 = null;
    var blueHistogram2 = null;

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
                    // histogram[grayScale] += 1;
                    histogram[Math.round(grayScale)] += 1; // Round the grayscale value to the nearest integer
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
     * Update the histogram removing min and max
     */
    function updateHistogram(histogram, pixelsToIgnore) {
        var min = 0, max = 255;

        /* TODO: You need to build the histogram here */
        var pixelsToIgnore = pixelsToIgnore / 2;
        var min_count = 0;
        var max_count = 0;

        // Find the minimum in the histogram with non-zero value by
        // ignoring the number of pixels given by pixelsToIgnore
        for (min = 0; min < 255; min++) {
            if (histogram[min] > 0) {
                if (min_count + histogram[min] < pixelsToIgnore) {
                    min_count += histogram[min];
                    histogram[min] = 0;
                }
                else {
                    histogram[min] -= (pixelsToIgnore - min_count);
                    min_count += pixelsToIgnore - min_count;
                    break;
                }
            }
        }

        // Find the maximum in the histogram with non-zero value by
        // ignoring the number of pixels given by pixelsToIgnore
        for (max = 255; max > 0; max--) {
            if (histogram[max] > 0) {
                if (max_count + histogram[max] < pixelsToIgnore) {
                    max_count += histogram[max];
                    histogram[max] = 0;
                }
                else {
                    histogram[max] -= (pixelsToIgnore - max_count);
                    max_count += pixelsToIgnore - max_count;
                    break;
                }
            }
        }
        return { "min": min, "max": max };
    }

    /*
    * Visualisation of the histogram
    */
    function visualiseHistogram(histogram, histogram2) {

        const canvasGreyHistogram = document.getElementById('gray-histogram');
        const canvasGreyHistogram2 = document.getElementById('gray-histogram-2');

        const dataGreyHistogram = {
            labels: Array.from({ length: 256 }, (_, i) => i), // create an array with 256 labels from 0 to 255
            datasets: [{
                label: 'Original Grayscale Histogram',
                data: histogram,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            ]
        };

        const dataGreyHistogram2 = {
            labels: Array.from({ length: 256 }, (_, i) => i), // create an array with 256 labels from 0 to 255
            datasets: [{
                label: 'Equalized Grayscale Histogram',
                data: histogram2,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            ]
        };

        const options = {
            scale: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Count'
                    },
                    ticks: {
                        beginAtZero: true,
                        suggestedMax: 255,
                    }
                }]
            },
            height: 360,
            width: 480,
            responsive: false,
            maintainAspectRatio: false,
        };

        // Create the histogram
        if (grayHistogram != null) {
            grayHistogram.destroy();
        }
        if (grayHistogram2 != null)
            grayHistogram2.destroy();

        grayHistogram = new Chart(canvasGreyHistogram, {
            type: 'bar',
            data: dataGreyHistogram,
            options: options,
        });

        grayHistogram2 = new Chart(canvasGreyHistogram2, {
            type: 'bar',
            data: dataGreyHistogram2,
            options: options,
        });
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

    imageproc.equalization = function (inputData, outputData, type, percentage) {
        console.log("Applying Equalization...");

        // Find the number of pixels to ignore from the percentage
        var pixelsToIgnore = (inputData.data.length / 4) * percentage;

        var histogram, histogram2;
        if (type == "gray") {
            // front-end visual control
            document.getElementById('canvas-container-row-1').style.display = "flex";
            document.getElementById('canvas-container-row-2').style.display = "none";
            document.getElementById('canvas-container-row-3').style.display = "none";
            document.getElementById('canvas-container-row-4').style.display = "none";

            // Build Histogram
            histogram = buildHistogram(inputData, "gray");
            var old_histogram = histogram.slice();

            // Update Histogram with pixels to ignore
            updateHistogram(histogram, pixelsToIgnore);

            // Calculate CDF
            var cdf_gray = new Array(256).fill(0);
            cdf_gray[0] = histogram[0];
            for (var i = 1; i < cdf_gray.length; i++)
                cdf_gray[i] = cdf_gray[i - 1] + histogram[i];

            // Normalized CDF
            var normalized_cdf_gray = new Array(256).fill(0);
            for (var i = 0; i < normalized_cdf_gray.length; i++)
                normalized_cdf_gray[i] = Math.round((cdf_gray[i] - cdf_gray[0]) * (255) / (cdf_gray[cdf_gray.length - 1] - cdf_gray[0]));

            // Apply equalization
            for (var i = 0; i < inputData.data.length; i += 4) {
                outputData.data[i] = normalized_cdf_gray[inputData.data[i]];
                outputData.data[i + 1] = normalized_cdf_gray[inputData.data[i + 1]];
                outputData.data[i + 2] = normalized_cdf_gray[inputData.data[i + 2]];
            }
            // Build Histogram
            histogram2 = buildHistogram(outputData, "gray");
            visualiseHistogram(old_histogram, histogram2);

        }
        else {
            // front-end visual control
            document.getElementById('canvas-container-row-1').style.display = "none"
            document.getElementById('canvas-container-row-2').style.display = "flex";
            document.getElementById('canvas-container-row-3').style.display = "flex";
            document.getElementById('canvas-container-row-4').style.display = "flex";

            var histogramRed = buildHistogram(inputData, "red");
            var histogramGreen = buildHistogram(inputData, "green");
            var histogramBlue = buildHistogram(inputData, "blue");
            var old_histogramRed = histogramRed.slice();
            var old_histogramGreen = histogramGreen.slice();
            var old_histogramBlue = histogramBlue.slice();

            // Update Histogram with pixels to ignore
            updateHistogram(histogramRed, pixelsToIgnore);
            updateHistogram(histogramGreen, pixelsToIgnore);
            updateHistogram(histogramBlue, pixelsToIgnore);

            // Calculate CDF
            var cdf_red = new Array(256).fill(0);
            var cdf_green = new Array(256).fill(0);
            var cdf_blue = new Array(256).fill(0);

            cdf_red[0] = histogramRed[0];
            cdf_green[0] = histogramGreen[0];
            cdf_blue[0] = histogramBlue[0];

            for (var i = 1; i < cdf_red.length; i++) {
                cdf_red[i] = cdf_red[i - 1] + histogramRed[i];
                cdf_green[i] = cdf_green[i - 1] + histogramGreen[i];
                cdf_blue[i] = cdf_blue[i - 1] + histogramBlue[i];
            }

            //Normalized CDF
            var normalized_cdf_red = new Array(256).fill(0);
            var normalized_cdf_green = new Array(256).fill(0);
            var normalized_cdf_blue = new Array(256).fill(0);

            for (var i = 0; i < 256; i++) {
                normalized_cdf_red[i] = Math.round((cdf_red[i] - cdf_red[0]) * (255) / (cdf_red[cdf_red.length - 1] - cdf_red[0]));
                normalized_cdf_green[i] = Math.round((cdf_green[i] - cdf_green[0]) * (255) / (cdf_green[cdf_green.length - 1] - cdf_green[0]));
                normalized_cdf_blue[i] = Math.round((cdf_blue[i] - cdf_blue[0]) * (255) / (cdf_blue[cdf_blue.length - 1] - cdf_blue[0]));
            }

            for (var i = 0; i < inputData.data.length; i += 4) {
                outputData.data[i] = normalized_cdf_red[inputData.data[i]];
                outputData.data[i + 1] = normalized_cdf_green[inputData.data[i + 1]];
                outputData.data[i + 2] = normalized_cdf_blue[inputData.data[i + 2]];
            }
        }
    }

}(window.imageproc = window.imageproc || {}));
