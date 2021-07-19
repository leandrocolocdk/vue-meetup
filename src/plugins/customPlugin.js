const customPlugin = {
  install: function(Vue) {
    // 1. Add Global method o property
    Vue.myGlobalMethod = function() {
      alert("I am global method!");
    };

    Vue.myGlobalProperty = "I am Custom property";

    // 2. Add Global asset
    Vue.directive("blue-color", {
      bind(el) {
        el.style.color = "blue";
      }
    });

    // 3. Inject some component options, mixins
    Vue.mixin({
      data() {
        return {
          custom_message: "RAAAAWR"
        };
      },
      created() {
        console.log("Custom mixin created!");
      },
      methods: {
        scream() {
          alert(this.custom_message);
        }
      }
    });

    // 4. Add an instance method or property
    Vue.prototype.$customMethod = function() {
      alert("I am custom instance method");
    };
  }
};

export default customPlugin;
