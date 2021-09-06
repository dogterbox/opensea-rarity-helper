{
  let data = [];
  let previousUrl = "";
  let allAnchorTags = [];

  // @todo - move these styles to external stylesheet
  const styles = {
    label: "color: red; font-weight: 600; font-size: 12px",
    rank: 'display: block; font-family: "Poppins", sans-serif; position: absolute; left: 12px; bottom: 20px; color: #000; font-weight: 500; font-size: 11px',
    rarity:
      'display: block; font-family: "Poppins", sans-serif; position: absolute; left: 12px; bottom: 6px; color: #000; font-weight: 500; font-size: 11px',
  };

  // observe any changes to the url and
  // add/remove event listeners when required
  const observer = new MutationObserver(() => {
    if (location.href !== previousUrl) {
      previousUrl = location.href;
      if (previousUrl.includes("/collection/g-evols")) {
        document.addEventListener("scroll", onScroll, false);
      } else {
        document.removeEventListener("scroll", onScroll, false);
      }
    }
  });

  const onScroll = () => {
    const tags = document.querySelectorAll(".Asset--anchor");
    [].forEach.call(allAnchorTags, (a) => {
      if (!allAnchorTags.includes(a.href)) {
        allAnchorTags.push(a);
      }
    });

    for (const tag of tags) {
      const idx = data.findIndex(({ id }) => id === +tag.href.split("/").pop());
      if (idx !== -1) {
        if (!document.querySelector(`#g-evol-rank-${idx}`)) {
          const rank = document.createElement("div");
          rank.id = `g-evol-rank-${idx}`;
          rank.innerHTML = `<span style="${styles.label}">Rank:</span> #${data[idx].rank}`;
          rank.style.cssText = styles.rank;
          tag.appendChild(rank);

          const rarity = document.createElement("div");
          rarity.id = `g-evol-rarity-${idx}`;
          rarity.innerHTML = `<span style="${styles.label}">Rarity Score:</span> ${data[idx].rarity}`;
          rarity.style.cssText = styles.rarity;
          tag.appendChild(rarity);
        }
      }
    }
  };

  observer.observe(document.body, { childList: true });

  fetch("https://opensea-rarity-helper.vercel.app/g-evols/stats")
    .then((response) => response.json())
    .then((response) => (data = response))
    .catch((error) => console.error(error));
}
