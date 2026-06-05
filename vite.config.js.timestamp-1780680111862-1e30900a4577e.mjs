// vite.config.js
import { defineConfig } from "file:///C:/Users/Sujai%20Kumar/OneDrive/Desktop/Projects/Sujai.Projects/Clone-NN/Broken-Nari-Nexus/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Sujai%20Kumar/OneDrive/Desktop/Projects/Sujai.Projects/Clone-NN/Broken-Nari-Nexus/node_modules/@vitejs/plugin-react/dist/index.js";
import tailwindcss from "file:///C:/Users/Sujai%20Kumar/OneDrive/Desktop/Projects/Sujai.Projects/Clone-NN/Broken-Nari-Nexus/node_modules/@tailwindcss/vite/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\Sujai Kumar\\OneDrive\\Desktop\\Projects\\Sujai.Projects\\Clone-NN\\Broken-Nari-Nexus";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tailwindcss()
    // Add the Tailwind plugin here
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    port: 5173,
    strictPort: false,
    open: true
  },
  build: {
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor": ["react", "react-dom", "react-router-dom"],
          "animation": ["framer-motion"],
          "ui": ["lucide-react"],
          "form": ["react-hook-form", "@hookform/resolvers", "zod"]
        }
      }
    },
    reportCompressedSize: false
  },
  define: {
    "__VITE_BUILD__": true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxTdWphaSBLdW1hclxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXFByb2plY3RzXFxcXFN1amFpLlByb2plY3RzXFxcXENsb25lLU5OXFxcXEJyb2tlbi1OYXJpLU5leHVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxTdWphaSBLdW1hclxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXFByb2plY3RzXFxcXFN1amFpLlByb2plY3RzXFxcXENsb25lLU5OXFxcXEJyb2tlbi1OYXJpLU5leHVzXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9TdWphaSUyMEt1bWFyL09uZURyaXZlL0Rlc2t0b3AvUHJvamVjdHMvU3VqYWkuUHJvamVjdHMvQ2xvbmUtTk4vQnJva2VuLU5hcmktTmV4dXMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAnQHRhaWx3aW5kY3NzL3ZpdGUnOyAvLyBJbXBvcnQgdGhlIFRhaWx3aW5kIFZpdGUgcGx1Z2luXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICByZWFjdCgpLFxuICAgICAgICB0YWlsd2luZGNzcygpLCAvLyBBZGQgdGhlIFRhaWx3aW5kIHBsdWdpbiBoZXJlXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICAgIHBvcnQ6IDUxNzMsXG4gICAgICAgIHN0cmljdFBvcnQ6IGZhbHNlLFxuICAgICAgICBvcGVuOiB0cnVlLFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgICAgICAgICAgICd2ZW5kb3InOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICAgICAgICAgICAgICAgICdhbmltYXRpb24nOiBbJ2ZyYW1lci1tb3Rpb24nXSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpJzogWydsdWNpZGUtcmVhY3QnXSxcbiAgICAgICAgICAgICAgICAgICAgJ2Zvcm0nOiBbJ3JlYWN0LWhvb2stZm9ybScsICdAaG9va2Zvcm0vcmVzb2x2ZXJzJywgJ3pvZCddLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXG4gICAgfSxcbiAgICBkZWZpbmU6IHtcbiAgICAgICAgJ19fVklURV9CVUlMRF9fJzogdHJ1ZSxcbiAgICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThjLFNBQVMsb0JBQW9CO0FBQzNlLE9BQU8sV0FBVztBQUNsQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBO0FBQUEsRUFDaEI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLE9BQU87QUFBQSxNQUNILEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN4QztBQUFBLEVBQ0o7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLE1BQU07QUFBQSxFQUNWO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDWCxRQUFRO0FBQUEsUUFDSixjQUFjO0FBQUEsVUFDVixVQUFVLENBQUMsU0FBUyxhQUFhLGtCQUFrQjtBQUFBLFVBQ25ELGFBQWEsQ0FBQyxlQUFlO0FBQUEsVUFDN0IsTUFBTSxDQUFDLGNBQWM7QUFBQSxVQUNyQixRQUFRLENBQUMsbUJBQW1CLHVCQUF1QixLQUFLO0FBQUEsUUFDNUQ7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLElBQ0Esc0JBQXNCO0FBQUEsRUFDMUI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLGtCQUFrQjtBQUFBLEVBQ3RCO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
