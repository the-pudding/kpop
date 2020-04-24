/* global d3 */
import debounce from "lodash.debounce";
import isMobile from "./utils/is-mobile";
import linkFix from "./utils/link-fix";
import graphic from "./graphic";
import footer from "./footer";
import "intersection-observer";
import scrollama from "scrollama";

const $body = d3.select("body");
let previousWidth = 0;

function resize() {
  // only do resize on width changes, not height
  // (remove the conditional if you want to trigger on height change)
  const width = $body.node().offsetWidth;
  if (previousWidth !== width) {
    previousWidth = width;
    graphic.resize();
  }
}

function setupStickyHeader() {
  const $header = $body.select("header");
  if ($header.classed("is-sticky")) {
    const $menu = $body.select(".header__menu");
    const $toggle = $body.select(".header__toggle");
    $toggle.on("click", () => {
      const visible = $menu.classed("is-visible");
      $menu.classed("is-visible", !visible);
      $toggle.classed("is-visible", !visible);
    });
  }
}

function init() {
  var iframe = d3.select('#bars').select('iframe').node();
  var iframe1 = d3.select('#topten').select('iframe').node();
  var iframe2 = d3.select('#rankings').select('iframe').node();
  // var input = document.querySelector("#my-input");
  // input.addEventListener("change", function(e) {
  // var iframe = document.querySelector("#my-story iframe");
  // adds rel="noopener" to all target="_blank" links
  linkFix();
  // add mobile class to body tag
  $body.classed("is-mobile", isMobile.any());
  // setup resize event
  window.addEventListener("resize", debounce(resize, 150));
  // setup sticky header menu
  setupStickyHeader();
  // instantiate the scrollama
  const scroller = scrollama();
  // setup the instance, pass callback functions
  scroller
    .setup({
      step: "#bars-text .step",
      offset: 0.4,
      debug: false
    })
    .onStepEnter(response => {
      var test = response.index
      iframe.src = iframe.src.replace(/#slide-.*/, "") + "#slide-" + test;
      // { element , index , direction }
    })
    .onStepExit(response => {
      // { element, index, direction }
    });
  const scroller1 = scrollama();
  // setup the instance, pass callback functions
  scroller1
    .setup({
      step: "#topten-text .step",
      offset: 0.4,
      debug: false
    })
    .onStepEnter(response => {
      var test = response.index
      iframe1.src = iframe1.src.replace(/#slide-.*/, "") + "#slide-" + test;
      // { element , index , direction }
    })
    .onStepExit(response => {
      console.log(response)
      // { element, index, direction }
    }); 
  const scroller2 = scrollama();
  // setup the instance, pass callback functions
  scroller2
    .setup({
      step: "#rankings-text .step",
      offset: 0.4,
      debug: false
    })
    .onStepEnter(response => {
      var test = response.index
      iframe2.src = iframe2.src.replace(/#slide-.*/, "") + "#slide-" + test;
      // { element , index , direction }
    })
    .onStepExit(response => {
      // { element, index, direction }
    });
  // load footer stories
  footer.init();


}



init();
