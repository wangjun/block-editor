import React from 'react';
import {
	Switch,
	Route,
	withRouter
} from "react-router-dom";

// Examples
import { SimpleExample } from './examples/Simple';

import Menu from './layout/Menu';
import Home from './pages/Home';

const App = () => {
	return (
		<div className="text-gray-900 text-xl antialiased">
			{/* Header */}
			<div className="px-10 py-5 flex items-center shadow fixed w-screen bg-white z-50">
				{/* Logo */}
				<a href="/">
					<svg width="159" height="40" viewBox="0 0 1485 373" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clipPath="url(#clip0)">
							<g clipPath="url(#clip1)">
								<path d="M1419.39 179.773H1397.96C1393.95 179.773 1392.24 178.042 1392.24 174.051V160.326C1392.24 156.314 1393.95 154.603 1397.96 154.603H1419.39V114.082C1419.39 110.07 1421.1 108.359 1425.11 108.359H1442.81C1446.82 108.359 1448.53 110.07 1448.53 114.082V154.667H1479.13C1483.12 154.667 1484.83 156.377 1484.83 160.389V174.114C1484.83 178.105 1483.12 179.837 1479.13 179.837H1448.55V246.732C1448.55 259.402 1453.71 266.75 1465.99 266.75C1471.72 266.75 1474.57 265.314 1476.85 265.314C1479.13 265.314 1479.72 266.454 1479.72 268.46V286.472C1479.72 289.323 1478.85 290.189 1475.5 290.695C1469.14 291.557 1462.73 291.939 1456.32 291.836C1434.62 291.836 1419.46 280.116 1419.46 255.812L1419.39 179.773Z" fill="currentColor"></path>
								<path d="M1256.99 160.326C1256.99 156.314 1258.7 154.603 1262.71 154.603H1278.21C1282.23 154.603 1282.75 156.166 1283.94 160.326L1286.15 169.469C1299.9 156.419 1310.73 152.154 1330.22 152.133C1358.77 152.133 1379.06 167.252 1379.06 203.698V283.263C1379.06 287.254 1377.35 288.985 1373.34 288.985H1355.62C1351.61 288.985 1349.9 287.254 1349.9 283.263V204.12C1349.61 187.016 1339.7 173.544 1318.04 175.043C1312.41 175.683 1307.02 177.694 1302.35 180.901C1297.68 184.107 1293.86 188.411 1291.24 193.435C1285.6 204.838 1286.53 216.663 1286.15 233.556V283.305C1286.15 287.296 1284.44 289.027 1280.43 289.027H1262.71C1258.7 289.027 1256.99 287.296 1256.99 283.305V160.326Z" fill="currentColor"></path>
								<path d="M1215.84 94.0006C1219.69 93.9964 1223.45 95.1334 1226.65 97.2678C1229.85 99.4023 1232.34 102.438 1233.82 105.991C1235.3 109.545 1235.68 113.456 1234.94 117.23C1234.19 121.003 1232.34 124.471 1229.62 127.193C1226.9 129.914 1223.43 131.769 1219.66 132.521C1215.89 133.273 1211.98 132.889 1208.42 131.418C1204.87 129.946 1201.83 127.454 1199.69 124.255C1197.55 121.056 1196.41 117.296 1196.41 113.448C1196.39 110.89 1196.88 108.353 1197.84 105.984C1198.81 103.616 1200.24 101.464 1202.05 99.6541C1203.86 97.844 1206.01 96.4118 1208.38 95.4412C1210.74 94.4706 1213.28 93.9809 1215.84 94.0006V94.0006ZM1201.27 160.326C1201.27 156.314 1202.98 154.603 1206.99 154.603H1224.71C1228.72 154.603 1230.43 156.314 1230.43 160.326V283.263C1230.43 287.254 1228.72 288.985 1224.71 288.985H1206.99C1202.98 288.985 1201.27 287.254 1201.27 283.263V160.326Z" fill="currentColor"></path>
								<path d="M1038.32 221.773C1038.32 178.612 1067.75 151.732 1108.36 151.732C1148.96 151.732 1178.4 178.612 1178.4 221.773C1178.4 268.08 1146.39 291.815 1108.36 291.815C1070.33 291.815 1038.32 268.101 1038.32 221.773ZM1148.12 222.048C1148.12 193.182 1130.38 176.881 1108.38 176.881C1086.38 176.881 1068.64 193.182 1068.64 222.048C1068.64 248.358 1083.42 266.666 1108.38 266.666C1133.34 266.666 1148.1 248.379 1148.1 222.069L1148.12 222.048Z" fill="currentColor"></path>
								<path d="M887.659 160.326C887.659 156.314 889.369 154.603 893.36 154.603H907.951C911.372 154.603 913.103 156.039 913.673 158.615L916.82 169.469C925.667 159.46 940.258 151.753 959.051 151.753C993.934 151.753 1019.67 175.191 1019.67 221.794C1019.67 268.397 992.223 291.836 954.215 291.836C938.78 291.836 925.625 287.254 916.777 280.391V349.018C916.777 353.009 915.046 354.74 911.055 354.74H893.318C889.327 354.74 887.617 353.009 887.617 349.018L887.659 160.326ZM916.82 238.096C916.82 246.943 918.234 251.23 925.667 257.522C931.389 262.379 939.688 266.687 953.413 266.687C974.275 266.687 989.436 249.245 989.436 221.499C989.436 195.779 976.556 176.902 953.983 176.902C948.385 176.858 942.856 178.129 937.839 180.612C932.822 183.095 928.457 186.72 925.097 191.197C919.601 197.871 916.666 206.287 916.82 214.932V238.096Z" fill="currentColor"></path>
								<path d="M742.13 160.326C742.13 156.314 743.862 154.603 747.853 154.603H763.373C767.363 154.603 767.891 156.166 769.095 160.326L771.206 169.469C784.953 156.419 795.785 152.154 815.275 152.133C843.823 152.133 864.136 167.252 864.136 203.698V283.263C864.136 287.254 862.405 288.985 858.414 288.985H840.677C836.686 288.985 834.976 287.254 834.976 283.263V204.12C834.659 187.016 824.756 173.544 803.091 175.043C797.462 175.686 792.076 177.699 787.405 180.905C782.733 184.112 778.919 188.414 776.295 193.435C770.657 204.838 771.608 216.663 771.206 233.556V283.305C771.206 287.296 769.496 289.027 765.505 289.027H747.768C743.777 289.027 742.046 287.296 742.046 283.305L742.13 160.326Z" fill="currentColor"></path>
								<path d="M700.976 94.0006C704.822 94.0006 708.582 95.1412 711.78 97.2782C714.978 99.4151 717.471 102.452 718.943 106.006C720.415 109.56 720.8 113.47 720.05 117.242C719.299 121.015 717.447 124.48 714.727 127.2C712.008 129.92 708.542 131.772 704.77 132.522C700.997 133.273 697.087 132.888 693.534 131.416C689.98 129.944 686.943 127.451 684.806 124.253C682.669 121.055 681.528 117.295 681.528 113.448C681.509 110.889 681.998 108.351 682.969 105.983C683.939 103.614 685.371 101.463 687.181 99.6528C688.99 97.843 691.142 96.4112 693.51 95.4408C695.879 94.4704 698.416 93.9809 700.976 94.0006V94.0006ZM686.385 160.326C686.385 156.314 688.116 154.603 692.107 154.603H709.844C713.835 154.603 715.546 156.314 715.546 160.326V283.263C715.546 287.254 713.835 288.985 709.844 288.985H692.107C688.116 288.985 686.385 287.254 686.385 283.263V160.326Z" fill="currentColor"></path>
								<path d="M522 100.905C522 96.8935 523.731 95.183 527.722 95.183H603.485C645.505 95.183 668.395 120.353 668.395 155.511C668.395 189.297 644.935 215.839 606.631 215.839H553.462V283.263C553.462 287.254 551.752 288.985 547.74 288.985H527.722C523.731 288.985 522 287.254 522 283.263V100.905ZM602.408 187.819C625.635 187.819 636.996 173.523 636.996 155.511C636.996 137.499 625.572 123.204 602.408 123.204H553.462V187.819H602.408Z" fill="currentColor"></path>
							</g>
							<path fillRule="evenodd" clipRule="evenodd" d="M120.538 373.125H161.909V373.15C264.262 373.15 347.513 289.454 347.513 186.581C347.513 83.7076 264.262 0.0120519 161.903 0H161.681L149.426 0.144648C67.0263 0.210944 0 67.6158 0 150.462C0.000874773 181.815 9.75529 212.384 27.8978 237.889C46.0403 263.393 71.6626 282.557 101.178 292.696L101.352 292.745V353.839C101.352 358.954 103.373 363.86 106.971 367.477C110.57 371.094 115.45 373.125 120.538 373.125ZM149.744 40.0366L162.017 39.8919C243.175 39.9522 309.188 106.314 309.188 187.943C309.188 269.571 243.115 335.981 161.909 335.981H139.677V298.735H164.469C220.553 298.735 266.181 252.871 266.181 196.495V189.022C266.181 139.637 226.207 99.4558 177.078 99.4558H120.532C115.444 99.4558 110.564 101.488 106.965 105.105C103.367 108.721 101.346 113.627 101.346 118.742V220.518C108.055 228.793 121.845 234.826 134.436 235.17H139.677V138.004H177.06C190.522 138.018 203.428 143.4 212.948 152.967C222.467 162.535 227.822 175.508 227.838 189.04V196.495C227.819 213.392 221.131 229.591 209.243 241.537C197.354 253.482 181.237 260.199 164.427 260.211H130.587C119.445 259.595 108.568 256.562 98.7018 251.322C62.1398 232.632 38.3068 194.825 38.3068 151.83C38.3068 90.1864 88.1973 40.0366 149.522 40.0366H149.744Z" fill="currentColor"></path>
						</g>
						<defs>
							<clipPath id="clip0">
								<rect width="1485" height="373" fill="currentColor"></rect>
							</clipPath>
							<clipPath id="clip1">
								<rect width="1027" height="260.74" fill="currentColor" transform="translate(522 94)"></rect>
							</clipPath>
						</defs>
					</svg>
				</a>

				<span className="mt-1 ml-3 mr-5 text-xs font-bold text-gray-500 bg-gray-200 rounded shadow py-1 px-2">Open Source</span>

				<h2 className="text-2xl font-bold text-gray-900">Block Editor</h2>
			</div>

			<div className="pt-24 px-10 py-5 flex flex-row">
				{/* Sidebar */}
				<div className="mt-3 mr-20">
					<h3 className="text-gray-900 font-bold mb-3">Documentation</h3>
					<Menu />
				</div>

				{/* Content Area */}
				<div className="mt-3">
					<Switch>
						<Route path="/examples/simple" component={SimpleExample} />
						<Route path="/" component={Home} />
					</Switch>
				</div>
			</div>
		</div>
	);
};

export default withRouter(App);
