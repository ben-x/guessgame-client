<template>

  <div class="modal fade"
       id="modal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modalLabel"
       aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">{{title}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-html="htmlContent"></div>
          <div>{{textContent}}</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
<!--          <button type="button" class="btn btn-primary">Save changes</button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: String,
    htmlContent: String,
    textContent: String,
  },
  methods: {
    open(evt) {
      $('#modal').modal({
        backdrop: true,
        keyboard: true,
        focus: true,
        show: true,
      });
    },
  },
};
</script>

<style scoped>

</style>
