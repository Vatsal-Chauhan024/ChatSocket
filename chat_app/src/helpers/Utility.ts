const ScrollToDiv = (divId?: string, scrollToBottom?: boolean) => {
  if (divId) {
    const div = document.querySelector(`#${divId}`);
    if (div) {
      const divScrollHeight = div.scrollHeight;
      console.log("divScrollHeight", divScrollHeight);
      div.scrollTo({
        top: scrollToBottom && scrollToBottom === true ? divScrollHeight : 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};
export const Utility = { ScrollToDiv };
