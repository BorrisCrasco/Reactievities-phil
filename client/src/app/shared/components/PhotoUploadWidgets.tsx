import { CloudUpload } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from 'react-dropzone';
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
    uploadPhoto: (file: Blob) => void;
    loading: boolean;
};

export default function PhotoUploadWidgets({ uploadPhoto, loading }: Props) {
    const [files, setFiles] = useState<object & { preview: string }[]>([]);
    const cropperRef = useRef<ReactCropperElement>(null);

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file as Blob),
            })
        ));
    }, []);

    const onCrop = useCallback(() => {
        const cropper = cropperRef.current?.cropper;
        cropper?.getCroppedCanvas().toBlob(blob => {
            uploadPhoto(blob as Blob);
        });
    }, [uploadPhoto]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <>
            {/* Step 1 */}
            <Box>
                <Typography variant="overline" color="secondary">Step 1 - Add Photo</Typography>
                <Box
                    {...getRootProps()}
                    sx={{
                        border: 'dashed 3px #eee',
                        borderColor: isDragActive ? 'green' : '#eee',
                        borderRadius: '5px',
                        paddingTop: '30px',
                        textAlign: 'center',
                        height: 280,
                        width: '100%',
                        cursor: 'pointer',
                    }}
                >
                    <input {...getInputProps()} />
                    <CloudUpload sx={{ fontSize: 80 }} />
                    <Typography variant="h5">Drop image here</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {isDragActive ? "Drop the files here..." : "Drag 'n' drop or click to select files"}
                    </Typography>
                </Box>
            </Box>

            {/* Step 2 */}
            <Box>
                <Typography variant="overline" color="secondary">Step 2 - Resize Image</Typography>
                {files[0]?.preview && (
                    <Cropper
                        src={files[0].preview}
                        style={{ height: 300, width: '100%' }}
                        initialAspectRatio={1}
                        aspectRatio={1}
                        preview=".img-preview"
                        guides={false}
                        viewMode={1}
                        background={false}
                        ref={cropperRef}
                    />
                )}
            </Box>

            {/* Step 3 */}
            <Box>
                {files[0]?.preview && (
                    <>
                        <Typography variant="overline" color="secondary">Step 3 - Preview & Upload</Typography>
                        <Box
                            className="img-preview"
                            sx={{
                                width: '100%',
                                height: 300,
                                overflow: 'hidden',
                                backgroundColor: '#f7f7f7',
                                mb: 2,
                            }}
                        />
                        <Button
                            fullWidth
                            onClick={onCrop}
                            variant="contained"
                            color="secondary"
                            disabled={loading}
                        >
                            Upload
                        </Button>
                    </>
                )}
            </Box>
        </>
    );
}
