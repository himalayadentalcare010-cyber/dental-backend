const sizePresets = {
  banner: { width: 1200, height: 600 },
  testimonial: { width: 800, height: 400 },
  blog: { width: 1024, height: 512 },
  // add other presets as needed
};
const qualityPresets = {
  banner: 90, // higher quality for banner
  testimonial: 70, // lower quality for testimonial
  blog: 80, // medium quality for blog
};

module.exports = { sizePresets, qualityPresets };
