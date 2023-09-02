const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
	// mode: "development",
	mode: "production",
	entry: "./src/index.ts",
	plugins: [new CompressionPlugin()],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					mangle: true,
				},
			}),
		],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
			},
		],
	},
	resolve: {
		extensionAlias: {
			".js": [".ts", ".js"],
		},
		modules: ["node_modules"],
		extensions: [".ts", ".js", ".json"],
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "./dist/src"),
	},
};
