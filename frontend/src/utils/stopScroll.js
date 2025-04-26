export const stopScroll = (status) => {
  const handleScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (status) {
    document.body.style.overflow = "hidden";
    window.addEventListener("scroll", handleScroll, { passive: false });
  }
};
