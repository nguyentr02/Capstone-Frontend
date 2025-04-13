// src/store/ticketStore.js
import { defineStore } from 'pinia'

export const useTicketStore = defineStore('ticket', {
  state: () => ({
    // For selecting votes (Select Category page)
    ticketCounts: {
      childRun: 0,
      adultWalk: 0,
      childWalk: 0,
    },
    // Storing participant details (used by PersonalInfo, Questionnaire, Review pages)
    ticketList: [],
    // Activity questionnaire data
    eventSurvey: {
      source: '',
      dietaryRestrictions: '',
      errors: {}
    },
    // Team Options
    teamOption: ''
  }),
  actions: {
    setTicketCounts(counts) {
      this.ticketCounts = { ...this.ticketCounts, ...counts }
    },
    // Generate default ticket data based on ticketCounts
    generateTickets() {
      const tickets = []
      let idCounter = 1
      const createTicket = (type) => ({
        id: idCounter++,
        type,
        email: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        country: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        errors: {},
        proof: null,
        // Reserve fields for questionnaires
        survey: {
          emergencyContactName: '',
          emergencyContactPhone: '',
          hasMedicalCondition: '',
          reason: '',
          errors: {}
        }
      })
      for (let i = 0; i < this.ticketCounts.adultWalk; i++) {
        tickets.push(createTicket('adultWalk'))
      }
      for (let i = 0; i < this.ticketCounts.childRun; i++) {
        tickets.push(createTicket('childRun'))
      }
      for (let i = 0; i < this.ticketCounts.childWalk; i++) {
        tickets.push(createTicket('childWalk'))
      }
      this.ticketList = tickets
    },
    updateTicket(index, payload) {
      this.ticketList[index] = { ...this.ticketList[index], ...payload }
    },
    setEventSurvey(survey) {
      this.eventSurvey = { ...this.eventSurvey, ...survey }
    },
    setTeamOption(option) {
      this.teamOption = option
    },
    // Filter out the File object and keep only the file name
    sanitizeTickets() {
      return this.ticketList.map(ticket => {
        const { proof, ...rest } = ticket
        return {
          ...rest,
          proof: proof ? { name: proof.name } : null
        }
      })
    }
  }
})
