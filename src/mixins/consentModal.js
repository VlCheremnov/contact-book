// Модалка подтверждения
import modalСonsent from '~/components/modalСonsent'

export default {
  components: {
    'modal-consent': modalСonsent
  },

  data: () => ({
    // Пропсы для передачи в модалку
    consentModal: {}
  }),

  methods: {

    // Метод для открытия модалки
    openConsentModal (title, action, args) {
      this.consentModal = {
        visible: true, // Состояние
        title, // Заголовок
        action, // Действие при успехе
        args // Аргумент
      }
    },

    // Закрываем модалку
    closeConsentModal () {
      this.consentModal = {}
    }
  }
}
