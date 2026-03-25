import { useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleShorten = async (event) => {
    event.preventDefault();

    if (!url.trim()) {
      setError('Please enter a URL to shorten.');
      return;
    }

    setIsLoading(true);
    setError('');
    setCopied(false);

    try {
      const response = await axios.post(`${API_BASE_URL}/shorten`, {
        originalUrl: url.trim(),
      });

      setShortUrl(response.data.shortUrl);
    } catch (requestError) {
      setShortUrl('');
      setError(requestError.response?.data?.error || 'Unable to shorten the URL right now.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shortUrl) {
      return;
    }

    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
    } catch {
      setError('Copy failed. Please copy the short URL manually.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 lg:flex-row">
        <section className="flex-1 rounded-3xl border border-cyan-400/20 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/40 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">URL Shortener</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Turn long links into short, shareable URLs.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Paste a link, generate a compact URL, and share it with a QR code in seconds.
          </p>

          <form className="mt-8 flex flex-col gap-4" onSubmit={handleShorten}>
            <label className="form-control w-full">
              <span className="mb-2 text-sm font-medium text-slate-200">Enter your long URL</span>
              <input
                className="input input-bordered w-full border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-500"
                type="url"
                placeholder="https://example.com/really/long/link"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
            </label>

            <button
              className="btn border-none bg-cyan-400 text-slate-950 hover:bg-cyan-300"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Creating short URL...' : 'Shorten URL'}
            </button>
          </form>

          {error && (
            <div className="alert alert-error mt-4">
              <span>{error}</span>
            </div>
          )}
        </section>

        <aside className="w-full rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl lg:max-w-md">
          <h2 className="text-2xl font-semibold text-white">Result</h2>
          <p className="mt-2 text-sm text-slate-400">
            Your generated short link and QR code will appear here.
          </p>

          {shortUrl ? (
            <div className="mt-6 space-y-5">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Short URL</p>
                <a
                  className="mt-2 block break-all text-lg text-cyan-300 hover:text-cyan-200"
                  href={shortUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {shortUrl}
                </a>
              </div>

              <button
                className="btn w-full border border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700"
                type="button"
                onClick={handleCopy}
              >
                {copied ? 'Copied!' : 'Copy short URL'}
              </button>

              <div className="flex justify-center rounded-2xl bg-white p-4">
                <QRCode size={180} value={shortUrl} />
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-700 px-6 py-10 text-center text-slate-500">
              Generate a short link to see the preview.
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

export default App;
