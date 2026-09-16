import React, { useState, useEffect } from 'react';
import { Settings, Key, X, Check, ExternalLink, ShieldCheck } from 'lucide-react';

export const SettingsModal = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(localStorage.getItem('gemini_api_key') || '');
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
    } else {
      localStorage.removeItem('gemini_api_key');
    }
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-[#121419] border border-[#2d323f] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#282d38] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#c5a059]">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-base font-semibold text-white">AI Configuration</h2>
              <p className="font-mono text-[10px] text-gray-400">
                100% Client-Side • Free Gemini Vision API
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="p-4 bg-[#161921] border border-[#282d38] rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-mono text-[11px] uppercase tracking-wider text-[#c5a059] flex items-center space-x-1.5">
                <Key className="w-3.5 h-3.5" />
                <span>Google Gemini API Key</span>
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[10px] text-blue-400 hover:text-blue-300 flex items-center space-x-1"
              >
                <span>Get Free Key (Google AI Studio)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-[#0d0e12] border border-[#2d323d] focus:border-[#c5a059] text-xs font-mono text-white rounded-lg p-2.5 focus:outline-none transition"
            />

            <div className="flex items-center space-x-2 text-[11px] text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                Your key is stored <strong>only in your browser (localStorage)</strong> and never sent to any backend server.
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#0e1015] border border-white/5 rounded-xl space-y-1.5 text-xs text-gray-400">
            <span className="font-serif text-white font-medium block">
              No API Key? No Problem!
            </span>
            <p className="leading-relaxed">
              Lumina Studio includes an <strong>intelligent offline procedural engine</strong> that analyzes layouts and generates high-contrast editorial wireframes even without an API key.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#0d0e12] border-t border-[#282d38] flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#c5a059] hover:bg-[#e4c88a] text-black font-semibold text-xs rounded-xl transition flex items-center space-x-1.5"
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Configuration</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
