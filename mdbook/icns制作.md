### Mac 图标制作

1、准备一张大小为 1024x1024 的图片 比如 `1024x024.png`

2、新建文件把下面的代码复制进去，改后缀名为 `.sh` 比如 `pngtoicns.sh`

3、把图片和脚本文件放到同一个文件夹，在当前文件夹打开终端

4、在终端中输入 `sh pngtoicns.sh` 输入图片名字和要生成的文件名

```shell
read -p "要准换的 png 文件: " fileDir
read -p "输出文件名: " outFileName

tmpFileName=__tmp.iconset

mkdir $tmpFileName
sips -z 16 16 $fileDir --out $tmpFileName/icon_16x16.png
sips -z 32 32 $fileDir --out $tmpFileName/icon_16x16@2x.png
sips -z 32 32 $fileDir --out $tmpFileName/icon_32x32.png
sips -z 64 64 $fileDir --out $tmpFileName/icon_32x32@2x.png
sips -z 128 128 $fileDir --out $tmpFileName/icon_128x128.png
sips -z 256 256 $fileDir --out $tmpFileName/icon_128x128@2x.png
sips -z 256 256 $fileDir --out $tmpFileName/icon_256x256.png
sips -z 512 512 $fileDir --out $tmpFileName/icon_256x256@2x.png
sips -z 512 512 $fileDir --out $tmpFileName/icon_512x512.png
sips -z 1024 1024 $fileDir --out $tmpFileName/icon_512x512@2x.png
iconutil -c icns $tmpFileName -o $outFileName.icns
rm -rf $tmpFileName
```

