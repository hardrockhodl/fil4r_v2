import { useState, useCallback } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { supabase, BUCKET_NAME } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { UploadZone } from './UploadZone';
import { ShareLink } from './ShareLink';

export const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const uploadFile = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2)}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file, {
          cacheControl: '0',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data, error: urlError } = await supabase.storage
        .from(BUCKET_NAME)
        .createSignedUrl(fileName, 3600);

      if (urlError) throw urlError;

      if (data?.signedUrl) {
        setShareLink(data.signedUrl);
        toast.success('File uploaded successfully!');

        const checkAndDelete = async () => {
          try {
            const { data: downloads } = await supabase.storage
              .from(BUCKET_NAME)
              .list('', {
                search: fileName,
              });

            if (!downloads || downloads.length === 0) {
              await supabase.storage.from(BUCKET_NAME).remove([fileName]);

              setFile(null);
              setShareLink('');
              toast.success(
                'File has been automatically deleted after download'
              );
            } else {
              setTimeout(checkAndDelete, 5000);
            }
          } catch (error) {
            console.error('Error checking file status:', error);
          }
        };

        setTimeout(checkAndDelete, 5000);
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Error uploading file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = useCallback((selectedFile: File) => {
    setFile(selectedFile);
    setShareLink('');
  }, []);

  return (
    <div className="upload-card">
      {/* DOOM floppy disk 666*/}
      <div className="upload-card-top">
        <img src="/server.png" alt="Server" className="serverlogo" />
        {/* <img src="/doom.png" alt="Floppy Disk" className="logo" /> */}
        <h1>Share Your Fil3s</h1>
        <img src="/server.png" alt="Server" className="serverlogo" />
      </div>

      <div className="space-y">
        <UploadZone
          onFileSelect={handleFileSelect}
          isLoading={loading}
          selectedFile={file}
        />

        {file && (
          <button
            onClick={uploadFile}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload />
                <span>Upload File</span>
              </>
            )}
          </button>
        )}

        {shareLink && <ShareLink url={shareLink} />}
      </div>
    </div>
  );
};