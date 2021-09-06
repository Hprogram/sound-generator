// 배열 형태로 sinewave를 그려줌
var tone = require("tonegenerator");
// sinewave를 음원화 시켜줌
var header = require("waveheader");
// 파일로 저장.
var fs = require("fs");

var file = fs.createWriteStream("16bit-example6.wav");

var samples = tone({
  freq: 208,
  lengthInSecs: 2,
  volume: (tone.MAX_16 / 100) * 50, // 볼륨 조절(최대치에서 비율로 내리는 식)
});

file.write(
  header(samples.length * 2, {
    bitDepth: 16,
  })
);

var data = Int16Array.from(samples);

var size = data.length * 2; // 2 bytes per sample

if (Buffer.allocUnsafe) {
  buffer = Buffer.allocUnsafe(size);
} else {
  buffer = new Buffer(size);
}

data.forEach(function (value, index) {
  buffer.writeInt16LE(value, index * 2);
});

file.write(buffer);
file.end();
