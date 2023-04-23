let locations = [
	["Hala 1,2,3,4", 44.430825, 26.006021],
	["Birou și hala 5", 44.424147, 25.976959],
];
let icons = [
	{
		url: "/icons/PNG/pin_orange.png", // url
		scaledSize: new google.maps.Size(30, 30), // scaled size
		origin: new google.maps.Point(0, 0), // origin
		anchor: new google.maps.Point(0, 0), // anchor
	},
	{
		url: "/icons/PNG/pin.png", // url
		scaledSize: new google.maps.Size(30, 30), // scaled size
		origin: new google.maps.Point(0, 0), // origin
		anchor: new google.maps.Point(0, 0), // anchor
	},
];

map = new google.maps.Map(document.getElementById("google-map"), {
	center: { lat: 44.423294, lng: 25.996251 },
	zoom: 13,
	mapId: "34b88f97ff8bc4c8",
});

let infowindow = new google.maps.InfoWindow();
for (i = 0; i < locations.length; i++) {
	marker = new google.maps.Marker({
		position: new google.maps.LatLng(locations[i][1], locations[i][2]),
		icon: icons[i],
		map: map,
	});

	google.maps.event.addListener(
		marker,
		"click",
		(function (marker, i) {
			return function () {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			};
		})(marker, i)
	);
}
