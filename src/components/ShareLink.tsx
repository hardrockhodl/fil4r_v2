import React from 'react';
import { Link as LinkIcon, Copy, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ShareLinkProps {
  url: string;
}

export const ShareLink: React.FC<ShareLinkProps> = ({ url }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <div className="share-link">
      <div className="share-link-content">
        <div className="link-icon">
          <LinkIcon />
        </div>
        <input
          type="text"
          value={url}
          readOnly
        />
        <button
          onClick={copyToClipboard}
          className="copy-button"
        >
          {copied ? 
            <Check className="text-green-500" /> : 
            <Copy />
          }
        </button>
      </div>
    </div>
  );
};