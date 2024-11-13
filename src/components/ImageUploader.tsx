import React, { useRef, useState } from 'react';

const CustomShapeCropper = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const cropImage = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageSrc) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const maskImage = new Image();
      maskImage.src = '/public/images/items/clothes/hat/hat_bucket.png'; // 티셔츠 모양 마스크 이미지 경로
      maskImage.onload = () => {
        const maskRatio = 1;

        // 캔버스 크기를 마스크 비율에 맞춤
        canvas.width = 200;
        canvas.height = 200;

        // 이미지가 캔버스를 채우면서 비율을 유지하도록 위치 설정
        const imageRatio = 1;
        let drawWidth, drawHeight;

        if (imageRatio > maskRatio) {
          drawHeight = canvas.height;
          drawWidth = image.width * (canvas.height / image.height);
        } else {
          drawWidth = canvas.width;
          drawHeight = image.height * (canvas.width / image.width);
        }

        // 이미지 그리기 (중앙 배치)
        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;
        ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

        // 마스크 적용
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(maskImage, 0, 0, canvas.width, canvas.height);

        // 캡처된 이미지를 저장
        const croppedDataUrl = canvas.toDataURL('image/png');
        setCroppedImage(croppedDataUrl);

        // 기본으로 되돌리기
        ctx.globalCompositeOperation = 'source-over';
      };
    };
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>티셔츠 모양 크롭</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={cropImage}>크롭하여 저장</button>

      {/* 원본 이미지 미리보기 */}
      {imageSrc && <img src={imageSrc} alt="Original Preview" style={{ maxWidth: '50%', marginTop: '10px' }} />}

      {/* 캔버스에 이미지 크롭 적용 */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* 크롭된 이미지 미리보기 */}
      {croppedImage && <img src={croppedImage} alt="Cropped Preview" style={{ maxWidth: '50%', marginTop: '10px' }} />}
    </div>
  );
};

export default CustomShapeCropper;
