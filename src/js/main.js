/* global d3 */
import debounce from "lodash.debounce";
import isMobile from "./utils/is-mobile";
import linkFix from "./utils/link-fix";
import graphic from "./graphic";
import footer from "./footer";
import "intersection-observer";
import scrollama from "scrollama";
import tippy, {animateFill} from "tippy.js";
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/animations/scale-extreme.css';

const $body = d3.select("body");
let previousWidth = 0;
let offset = .5;

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

  d3.select(".logo-swap").html('<a href="https://kontinentalist.com/" target="_blank"><img src="assets/images/kont-logo_2.png" alt="Kontinentalist Logo"></a>')

  if(isMobile){
    offset = 1;
  }

  const tippyImages = {"bts":"<img src='https://media.giphy.com/media/3ofT5IUGY3FNyi5MAg/giphy.gif'>",
                       "seo":"<img src='https://media.giphy.com/media/YRKlg4ZYNZrhtFGyd8/giphy.gif'>",
                       "super":"<img src='https://media.giphy.com/media/l0ErUBWwX9KaSoWnC/giphy.gif'>",
                       "girls":"<img src='https://media.giphy.com/media/xTiIzA9hZNM9Ake81i/giphy.gif'>",
                       "nct":"<img src='https://media.giphy.com/media/3ohuPG6tSoiaE7m0nK/giphy.gif'>",
                       "blackpink":"<img src='https://media.giphy.com/media/fx5Eq1QkybZBYmfq7M/giphy.gif'>",
                       "djdoc":"<img src='https://media.giphy.com/media/TKYOjhcoMYUNl6SiE8/giphy.gif'>",
                       "yoona":"<img src='https://media.giphy.com/media/3otPoBv5xqC4Za574k/giphy.gif'>",
                       "exo":"<img src='https://media.giphy.com/media/3orif6LTloyNnUv8oE/giphy.gif'>",
                       "seventeen":"<img src='https://media.giphy.com/media/3o6wr86sMOUaOOHXRS/giphy.gif'>",
                       "jayz":"<img src='https://media.giphy.com/media/C0CLctoErM7WE/giphy.gif'>",
                       "jungkook":"<img src='https://media.giphy.com/media/SqBnf9Go5I4MhhGU9t/giphy.gif'>",
                       "exp":"<img src='https://media.giphy.com/media/PlV6Y75V8b0Bd2krC6/giphy.gif'>"}

  d3.selectAll(".tooltip-highlight-gif")
    .attr("data-tippy-content", function (d) {
        var tippyValue = d3.select(this).attr("data-tippy-content")
        return tippyImages[tippyValue]
    })

   //set up tooltips
   d3.selectAll(".tooltip-highlight")
    .each(function(d){
      let text = d3.select(this).attr("data-tippy-content");
      d3.select(this)
        .on("mouseover",function(d){
          d3.select(this)
            .select("span")
            .style("display","inline-block")
        })
        .on("mouseout",function(d){
          d3.select(this)
            .select("span")
            .style("display",null)
        })
        .append("span")
        .attr("class","mouseover-text")
        .html(text);
    })


   d3.selectAll(".tooltip-highlight-gif")
    .each(function(d){
      let imgTag = d3.select(this).attr("data-tippy-content");
      d3.select(this)
        .on("mouseover",function(d){
          d3.select(this)
            .transition()
            .duration(0)
            .select(".mouseover-gif")
            .style("display","inline-block")
        })
        .on("mouseout",function(d){
          d3.select(this)
            .select(".mouseover-gif")
            .transition()
            .duration(1000)
            .style("opacity",0)
            .on("end",function(d){
              d3.select(this).style("opacity",null).style("display",null);
            })
        })
        .append("span")
        .attr("class","mouseover-gif")
        .html(imgTag)
    })
  // tippy('[data-tippy-content]',
  //     {
  //       allowHTML: true,
  //       content: 'Global content',
  //       trigger: 'mouseenter focus',
  //       duration: [10000, 10000],
  //       theme: 'vaporwave',
  //       animation: 'scale-extreme',
  //       inertia: true,
  //       animateFill: true,
  //       plugins: [animateFill],
  //       maxWidth: 400,
  //       placement: 'auto',
  //       placement: 'auto-start',
  //       placement: 'auto-end',
  //       touch: ['hold', 500],
  //
  //     }
  //   );

  //set up legend
  const legend = d3.selectAll('.legend').classed('legend-1',true)
  //const legendSmall = d3.select('.legend-small').classed('legend-1',true).
  const legendLabel = legend.append('div')
    .attr('position','absolute')
    .attr('stroke','#333333')
    .attr('height','100')
    .classed('legend-1',true)
    .classed('legend-label',true)

  var iframe = d3.select('#bars').select('iframe').node();
  // var iframe1 = d3.select('#topten').select('iframe').node();
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
      offset: offset,
      debug: false
    })
    .onStepEnter(response => {
      var test = response.index
      iframe.src = iframe.src.replace(/#slide-.*/, "") + "#slide-" + test;
      // { element , index , direction }
      if (test == 0) {
        legend.classed('legend-2',false)
        legend.classed('legend-3',false)
        legend.classed('legend-1',true)
        legendLabel.classed('legend-2',false)
        legendLabel.classed('legend-3',false)
        legendLabel.classed('legend-1',true)
      }
      if (test == 1) {
        legend.classed('legend-2',true)
        legend.classed('legend-3',false)
        legend.classed('legend-1',false)
        legendLabel.classed('legend-1',false)
        legendLabel.classed('legend-3',false)
        legendLabel.classed('legend-2',true)
      }
      if (test >= 2) {
        legend.classed('legend-2',false)
        legend.classed('legend-1',false)
        legend.classed('legend-3',true)
        legendLabel.classed('legend-2',false)
        legendLabel.classed('legend-1',false)
        legendLabel.classed('legend-3',true)
      }
    })
    .onStepExit(response => {
    });

  const scroller2 = scrollama();
  // setup the instance, pass callback functions
  scroller2
    .setup({
      step: "#rankings-text .step",
      offset: offset,
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
