<script>
import Chart from "chart.js";
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.addPlugin({
      afterDatasetsDraw: function(chart) {
        // To only draw at the end of animation, check for easing === 1
        var ctx = chart.ctx;

        chart.data.datasets.forEach(function(dataset, i) {
          var meta = chart.getDatasetMeta(i);
          if (!meta.hidden) {
            meta.data.forEach(function(element, index) {
              // Draw the text in black, with the specified font
              ctx.fillStyle = "rgb(102, 102, 102)";

              var fontSize = 12;
              var fontStyle = "normal";
              var fontFamily = "Helvetica Neue";
              ctx.font = Chart.helpers.fontString(
                fontSize,
                fontStyle,
                fontFamily
              );

              // Just naively convert to string for now
              var dataString = dataset.data[index].toString();
              if (dataString === "0") return;

              // Make sure alignment settings are correct
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";

              var padding = -15;
              var position = element.tooltipPosition();
              ctx.fillText(
                dataString,
                position.x,
                position.y - fontSize / 2 - padding
              );
            });
          }
        });
      },
    });
    this.renderChart(this.chartData, this.options);
  },
};
</script>
