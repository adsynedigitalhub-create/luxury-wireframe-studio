import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lumina Studio Caught Error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem('lumina_canvas_v1');
      localStorage.removeItem('canvas_elements');
    } catch (e) {
      console.warn(e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-screen bg-[#0c0d10] text-white flex flex-col items-center justify-center p-6 select-none font-sans">
          <div className="max-w-md w-full bg-[#151821] border border-[#2b3040] rounded-2xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center mx-auto text-[#c5a059] text-xl font-bold">
              !
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-white">
                Studio Recovery Assistant
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Studio reload karte waqt error catch hua hai. Aap foran 1-click se reset kar ke normal state mein aa sakte hain:
              </p>
            </div>

            <div className="p-3 bg-black/50 rounded-xl border border-white/5 text-left overflow-x-auto max-h-32 text-[11px] font-mono text-red-300">
              {this.state.error?.message || 'Unknown runtime error'}
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={this.handleReset}
                className="flex-1 py-2 px-4 bg-[#c5a059] hover:bg-[#d8b26e] text-black font-semibold rounded-xl text-xs transition shadow-lg"
              >
                🔄 Reset Cache & Reload
              </button>
              <button
                onClick={() => window.location.reload()}
                className="py-2 px-4 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs transition"
              >
                Just Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
