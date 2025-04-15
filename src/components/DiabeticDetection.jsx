import React, { useState, useRef, useEffect } from 'react';

const DiabeticDetection = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [filePreview, setFilePreview] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const background = document.createElement('div');
    background.className = 'robot-background';
    document.body.appendChild(background);

    return () => {
      document.body.removeChild(background);
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      videoRef.current.srcObject = stream;
      setIsCameraActive(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Camera access failed.');
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
      setFile(file);
      setFilePreview(URL.createObjectURL(file));
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = () => {
    if (!file) return alert('Please upload a file first.');

    setLoading(true);
    setResult(null);
    setProgress(0);

    let interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setLoading(false);
          const stage = Math.floor(Math.random() * 5);
          setResult(`Diabetic Retinopathy - Stage ${stage}`);
          return 100;
        }
        return oldProgress + 1;
      });
    }, 50);
  };

  const handleReturn = () => {
    setLoading(false);
    setResult(null);
    setFile(null);
    setFilePreview(null);
    setIsCameraActive(false);
    setProgress(0);
  };

  return (
    <div className="text-white ">
      <style>
        {`
          .robot-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-image: url('robot-animation.gif');
            background-size: cover;
            background-repeat: repeat;
            opacity: 0.15;
            z-index: -1;
            pointer-events: none;
          }
        `}
      </style>


      {loading || result ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex flex-col justify-center items-center z-50">
          {loading && (
            <div className="flex justify-center items-center">
              <div className="relative w-24 h-24">
                <div className="flex relative">
                  <div className="w-24 h-24 rounded-full border-t-8 border-white animate-spin"></div>
                  <div className="absolute w-24 h-24 rounded-full bg-gray-200 opacity-20 top-0 left-0"></div>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-white">
                  {progress}%
                </div>
              </div>
            </div>
          )}

          {result && !loading && (
            <div className="flex flex-col justify-center items-center p-8 bg-black  rounded-2xl shadow-lg border border-[#433D8B]">
                <div className="text-3xl font-extrabold text-white mb-6 animate-pulse drop-shadow-lg">
                  {result}
                </div>
                <p className="text-lg text-white mb-6 opacity-80">
                  Early detection is crucial for effective treatment. Please consult with a healthcare professional for further evaluation.
                </p>
                <button
                  onClick={handleReturn}
                  className="px-8 py-4 bg-[#433D8B] text-white rounded-md hover:bg-[#2E236C] transition-colors shadow-md hover:shadow-lg"
                >
                  Return to Upload
                </button>
              </div>
            )}
        </div>
      ) : (
        <div className="bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full sm:w-4/5 md:w-2/3 lg:w-2/3 xl:w-2/4 max-w-screen-lg border border-[#433D8B] mx-auto"> {/* Added mx-auto */}
          <div className="mb-6 flex space-x-4 justify-center">
            <button
              onClick={() => document.getElementById('fileInputImage').click()}
              className="px-6 py-3 bg-[#2E236C] text-white rounded-md hover:bg-[#433D8B] transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Upload Image
            </button>
            <input
              id="fileInputImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />

            <button
              onClick={() => document.getElementById('fileInputPDF').click()}
              className="px-6 py-3 bg-[#2E236C] text-white rounded-md hover:bg-[#433D8B] transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Upload PDF
            </button>
            <input
              id="fileInputPDF"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              hidden
            />
            <button
              onClick={startCamera}
              className="px-6 py-3 bg-[#2E236C] text-white rounded-md hover:bg-[#433D8B] transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Open Camera
            </button>
          </div>

          {isCameraActive && (
            <div className="mb-6">
              <video ref={videoRef} autoPlay playsInline width="100%" className="border border-[#433D8B] rounded-lg shadow-md" />
              <div className="flex justify-center mt-4">
                <button
                  onClick={captureImage}
                  className="px-6 py-3 bg-[#2E236C] text-white rounded-md hover:bg-[#433D8B] transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  Capture Image
                </button>
              </div>
            </div>
          )}

          {filePreview && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-white drop-shadow-sm">Preview</h2>
              {file.type === 'application/pdf' ? (
                <embed src={filePreview} width="100%" height="400px" />
              ) : (
                <img src={filePreview} alt="Preview" className="w-full h-auto rounded-md shadow-lg border border-[#433D8B]" />
              )}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full px-8 py-3 bg-[#433D8B] text-white rounded-md hover:bg-[#2E236C] transition-colors shadow-md hover:shadow-lg"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default DiabeticDetection;