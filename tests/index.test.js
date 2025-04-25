/**
 * @jest-environment jsdom
*/

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('index.html', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  describe('Firebase Configuration', () => {
    it('should have a defined firebaseConfig', () => {
      const script = document.querySelector('script[type="module"]');
      const scriptContent = script.textContent;
      expect(scriptContent).toContain('const firebaseConfig = {');
    });
  });

  describe('Name Generator Button', () => {
    test('should be enabled when the data is loaded and processed', async () => {
      const generateBtn = document.getElementById('generate-btn');
      const script = document.querySelector('script:not([type])');
      expect(generateBtn).toBeDefined();
      window.nameDatabase = [];
      window.dataLoaded = false;
      const domContentLoadedPromise = new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
      document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));

      await domContentLoadedPromise;
       // Wait for a short time to allow the button to be enabled
      
      //wait for data to be loaded
       while (!window.dataLoaded) {
        await new Promise(resolve => setTimeout(resolve, 100));
       }

      await new Promise((resolve) => setTimeout(resolve, 100));
      
      expect(generateBtn.disabled).toBe(false)
  })
  });
});
