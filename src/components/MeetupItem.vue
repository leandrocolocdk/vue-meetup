<template>
  <div class="column is-one-third">
    <div class="card is-hoverable large">
      <router-link
        :to="{ name: 'PageMeetupDetail', params: { id: meetup._id } }"
        class="card-meetup-link"
      >
        <div class="card-image">
          <figure class="image is-4by3">
            <!-- Obtener imagen de reunion  -->
            <img :src="meetup.image" :alt="meetup.title" />
          </figure>
        </div>
        <div class="card-content">
          <div class="level m-b-md">
            <div class="media-left">
              <div class="level-item has-text-centered">
                <div>
                  <!-- Obtener comienzo de la reunion  -->
                  <p class="title">
                    {{ meetup.startDate | formatDate("MMM") }}
                  </p>
                  <p class="title">{{ meetup.startDate | formatDate("D") }}</p>
                </div>
              </div>
            </div>
            <div class="media-content">
              <!-- Obtener titulo de reunion  -->
              <p class="title is-4 no-padding is-marginless">
                {{ meetup.title }}
              </p>
              <!-- Obtener categoria   -->
              <span class="tag is-success">{{
                meetup.category.name | capitalize
              }}</span>
              <!-- Obtener lugar de encuentro  -->
              <p class="subtitle is-7">{{ meetup.location }}</p>
            </div>
          </div>
          <!-- Obtener descripcion  -->
          <div class="content">
            {{ meetup.description }}
            <div class="background-icon">
              <span class="icon-twitter"></span>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    meetup: {
      required: true,
      type: Object
    }
  }
};
</script>

<style scoped lang="scss">
.card-meetup-link {
  color: black;
}

.is-hoverable {
  transition: 0.3s;

  &:hover {
    -webkit-box-shadow: 2px 4px 15px -2px rgba(189, 189, 189, 1);
    -moz-box-shadow: 2px 4px 15px -2px rgba(189, 189, 189, 1);
    box-shadow: 2px 4px 15px -2px rgba(189, 189, 189, 1);
  }
}
</style>
