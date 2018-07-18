## 图片压缩

img-compressor是一个简单高效的JS图片压缩库。

```bash
$ npm i img-compressor -S
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<input type="file" id="file" name="file" accept="image/*">
	<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://unpkg.com/img-compressor/dist/img-compressor.js"></script>
	<script>
		document.getElementById('file').addEventListener('change', function(event) {
			var file = event.target.files[0];

			var imgCompressor = new ImgCompressor.Create({
				width: 500
			});
            imgCompressor.compress(file, {
				success: function(result) {
					const formData = new FormData();

      				formData.append('file', result, result.name);
					$.ajax({
						url: '/upload',
						type: 'POST',
					    cache: false,
					    data: formData,
					    processData: false,
    					contentType: false
					})
					.done(function(res) {
					})
					.fail(function(err) {});
				},
				error: function(err) {
					console.log(err);
				}
			})
		})
	</script>
</body>
</html>
```

**方法**

```javascript
ImgCompressor.Create([options])
```

参数：
* width: 输出图片的宽度
* height: 输出图片的高度
* mineType: 输出图片的格式，默认为image/png
* quality: 输出图片的画质。值为0～1,默认为1

**实例方法**

```javascript
create(file[, options])
```

参数：
* file: 
* options: 
  * width: 输出图片的宽度
  * height: 输出图片的高度
  * mineType: 输出图片的格式，默认为image/png
  * quality: 输出图片的画质。值为0～1,默认为1


**上传**

* 基于Node： [img-compressor-examples](https://github.com/IronPans/img-compressor-examples)









