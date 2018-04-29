<template>
  <v-menu :nudge-width="100">
    <v-btn 
      slot="activator" 
      flat
      color="white"
    >
      <span :class="[textColor,textSize]">{{ locale }}</span>
      <fa 
        :class="[iconColor]" 
        :size="iconSize" 
        pull="right" 
        icon="caret-down"
      />
    </v-btn>
    <v-list>
      <v-list-tile 
        v-for="(value, key) in locales" 
        :key="key" 
        @click="setLocale(key)"
      >
        <v-list-tile-title v-text="value"/>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { VMenu } from 'vuetify'
import { mapGetters } from 'vuex'
import { loadMessages } from '~/plugins/i18n'
export default {
    components: {
        VMenu
    },
    props: {
        iconSize: {
            type: String,
            default: '1x'
        },
        textSize: {
            type: String,
            default: 'title'
        },
        textColor: {
            type: String,
            default: 'white--text'
        },
        iconColor: {
            type: String,
            default: 'info--text'
        }
    },
    computed: mapGetters({
        locale: 'lang/locale',
        locales: 'lang/locales'
    }),
    methods: {
        setLocale (locale) {
            if (this.$i18n.locale !== locale) {
                loadMessages(locale)
                this.$store.dispatch('lang/setLocale', { locale })
            }
        }
    }
}
</script>
