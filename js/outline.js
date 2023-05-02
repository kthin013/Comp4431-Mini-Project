(function (imageproc) {
    "use strict";

    /*
     * Apply sobel edge to the input data
     */
    imageproc.sobelEdge = function (inputData, outputData, threshold) {
        console.log("Applying Sobel edge detection...");

        /* Initialize the two edge kernel Gx and Gy */
        var Gx = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];
        var Gy = [
            [-1, -2, -1],
            [0, 0, 0],
            [1, 2, 1]
        ];

        /**
         * TODO: You need to write the code to apply
         * the two edge kernels appropriately
         */

        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                var outputR_x = 0; var outputR_y = 0;
                var outputG_x = 0; var outputG_y = 0;
                var outputB_x = 0; var outputB_y = 0;

                for (var j = -1; j <= 1; j++) {
                    for (var i = -1; i <= 1; i++) {
                        var pixel = imageproc.getPixel(inputData, x + i, y + j);
                        outputR_x += pixel.r * Gx[j + 1][i + 1];
                        outputR_y += pixel.r * Gy[j + 1][i + 1];

                        outputG_x += pixel.g * Gx[j + 1][i + 1];
                        outputG_y += pixel.g * Gy[j + 1][i + 1];

                        outputB_x += pixel.b * Gx[j + 1][i + 1];
                        outputB_y += pixel.b * Gy[j + 1][i + 1];
                    }
                }

                var i = (x + y * outputData.width) * 4;
                outputData.data[i] = Math.hypot(outputR_x, outputR_y);
                outputData.data[i + 1] = Math.hypot(outputG_x, outputG_y);
                outputData.data[i + 2] = Math.hypot(outputB_x, outputB_y);
            }
        }
        imageproc.threshold(outputData, outputData, threshold);
    }

}(window.imageproc = window.imageproc || {}));
