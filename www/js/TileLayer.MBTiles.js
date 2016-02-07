// inspired by: https://github.com/coomsie/topomap.co.nz/blob/master/Resources/leaflet/TileLayer.DB.js
L.TileLayer.MBTiles = L.TileLayer.extend({
	//db: SQLitePlugin
	mbTilesDB: null,

	initialize: function(url, options, db) {
		this.mbTilesDB = db;

		L.Util.setOptions(this, options);
	},
	getTileUrl: function (tilePoint, zoom, tile) {
		var z = this._getOffsetZoom(zoom);
		var x = tilePoint.x;
		var y = tilePoint.y;
		var base64Prefix = 'data:image/png;base64,';
		alert(x);
		this.mbTilesDB.executeSql("SELECT tile_data FROM images INNER JOIN map ON images.tile_id = map.tile_id WHERE zoom_level = ? AND tile_column = ? AND tile_row = ?", [z, x, y], function (res) {
			alert(res.rows.length)
			tile.src = base64Prefix + res.rows.item(0).tile_data;
		}, function (er) {
			alert(JSON.stringify(err));
		});
	},
	_loadTile: function (tile, tilePoint, zoom) {
		tile._layer = this;
		tile.onload = this._tileOnLoad;
		tile.onerror = this._tileOnError;
		this.getTileUrl(tilePoint, zoom, tile);
	}
});