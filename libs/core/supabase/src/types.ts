export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  chat: {
    Tables: {
      channel_invitations: {
        Row: {
          channel_id: string
          created_at: string
          id: string
          invited_by_user_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          channel_id: string
          created_at?: string
          id?: string
          invited_by_user_id?: string | null
          type?: string
          user_id: string
        }
        Update: {
          channel_id?: string
          created_at?: string
          id?: string
          invited_by_user_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "channel_invitations_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_invitations_invited_by_user_id_fkey"
            columns: ["invited_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_invitations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      channel_members: {
        Row: {
          added_by_user_id: string | null
          banned: boolean
          channel_id: string
          channel_role: string
          created_at: string
          id: string
          notifications_muted: boolean
          role: string
          shadow_banned: boolean
          status: string
          user_id: string
        }
        Insert: {
          added_by_user_id?: string | null
          banned?: boolean
          channel_id: string
          channel_role?: string
          created_at?: string
          id?: string
          notifications_muted?: boolean
          role?: string
          shadow_banned?: boolean
          status?: string
          user_id: string
        }
        Update: {
          added_by_user_id?: string | null
          banned?: boolean
          channel_id?: string
          channel_role?: string
          created_at?: string
          id?: string
          notifications_muted?: boolean
          role?: string
          shadow_banned?: boolean
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "channel_members_added_by_user_id_fkey"
            columns: ["added_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_members_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "channel_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      channels: {
        Row: {
          created_at: string
          creator_id: string
          disabled: boolean
          frozen: boolean
          hidden: boolean
          id: string
          is_public: boolean
          last_message_at: string | null
          members_count: number
          name: string | null
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_id?: string
          disabled?: boolean
          frozen?: boolean
          hidden?: boolean
          id?: string
          is_public?: boolean
          last_message_at?: string | null
          members_count?: number
          name?: string | null
          type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          disabled?: boolean
          frozen?: boolean
          hidden?: boolean
          id?: string
          is_public?: boolean
          last_message_at?: string | null
          members_count?: number
          name?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "channels_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          attachments: Json[] | null
          channel_id: string
          created_at: string
          id: string
          mentioned_users: string[] | null
          parent_id: string | null
          quoted_message_id: string | null
          show_in_channel: boolean | null
          text: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          attachments?: Json[] | null
          channel_id: string
          created_at?: string
          id: string
          mentioned_users?: string[] | null
          parent_id?: string | null
          quoted_message_id?: string | null
          show_in_channel?: boolean | null
          text: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          attachments?: Json[] | null
          channel_id?: string
          created_at?: string
          id?: string
          mentioned_users?: string[] | null
          parent_id?: string | null
          quoted_message_id?: string | null
          show_in_channel?: boolean | null
          text?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_quoted_message_id_fkey"
            columns: ["quoted_message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reactions: {
        Row: {
          created_at: string
          id: string
          message_id: string
          score: number
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message_id: string
          score?: number
          type?: string
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          message_id?: string
          score?: number
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          banned: boolean
          created_at: string
          id: string
          image: string | null
          last_active: string
          name: string | null
          online: boolean
          role: string
          updated_at: string
        }
        Insert: {
          banned?: boolean
          created_at?: string
          id: string
          image?: string | null
          last_active?: string
          name?: string | null
          online?: boolean
          role?: string
          updated_at?: string
        }
        Update: {
          banned?: boolean
          created_at?: string
          id?: string
          image?: string | null
          last_active?: string
          name?: string | null
          online?: boolean
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      start_chat: {
        Args: {
          members: string[]
          channel_name?: string
          is_public?: boolean
        }
        Returns: {
          created_at: string
          creator_id: string
          disabled: boolean
          frozen: boolean
          hidden: boolean
          id: string
          is_public: boolean
          last_message_at: string | null
          members_count: number
          name: string | null
          type: string
          updated_at: string
        }
      }
      start_chat_with_user: {
        Args: {
          member_id: string
        }
        Returns: {
          created_at: string
          creator_id: string
          disabled: boolean
          frozen: boolean
          hidden: boolean
          id: string
          is_public: boolean
          last_message_at: string | null
          members_count: number
          name: string | null
          type: string
          updated_at: string
        }
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      cities: {
        Row: {
          country_id: number | null
          created_at: string | null
          id: number
          name: Json
          ref: string
          timezone: string | null
          updated_at: string | null
          wikidata_id: string | null
        }
        Insert: {
          country_id?: number | null
          created_at?: string | null
          id?: number
          name: Json
          ref: string
          timezone?: string | null
          updated_at?: string | null
          wikidata_id?: string | null
        }
        Update: {
          country_id?: number | null
          created_at?: string | null
          id?: number
          name?: Json
          ref?: string
          timezone?: string | null
          updated_at?: string | null
          wikidata_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cities_country_id_foreign"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          }
        ]
      }
      companies: {
        Row: {
          created_at: string | null
          id: string
          is_enabled: boolean
          is_verified: boolean
          name: string
          owner_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean
          is_verified?: boolean
          name: string
          owner_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean
          is_verified?: boolean
          name?: string
          owner_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_owner_id_foreign"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      company_documents: {
        Row: {
          company_id: string
          created_at: string | null
          id: string
          object_id: string
          updated_at: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          id?: string
          object_id: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          id?: string
          object_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_documents_company_id_foreign"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_documents_object_id_foreign"
            columns: ["object_id"]
            isOneToOne: false
            referencedRelation: "objects"
            referencedColumns: ["id"]
          }
        ]
      }
      company_invitations: {
        Row: {
          company_id: string
          created_at: string | null
          email: string | null
          id: string
          invitation_code: string
          name: string
          phone_number: string
          sender_id: string | null
          updated_at: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          email?: string | null
          id?: string
          invitation_code: string
          name: string
          phone_number: string
          sender_id?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          email?: string | null
          id?: string
          invitation_code?: string
          name?: string
          phone_number?: string
          sender_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_invitations_company_id_foreign"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_invitations_sender_id_foreign"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      company_members: {
        Row: {
          company_id: string
          created_at: string | null
          id: string
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_members_company_id_foreign"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_members_user_id_foreign"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      company_vehicle_drivers: {
        Row: {
          driver_id: string
          vehicle_id: string
        }
        Insert: {
          driver_id: string
          vehicle_id: string
        }
        Update: {
          driver_id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_vehicle_drivers_driver_id_foreign"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_vehicle_drivers_vehicle_id_foreign"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          }
        ]
      }
      company_vehicle_service_areas: {
        Row: {
          service_area_id: string
          vehicle_id: string
        }
        Insert: {
          service_area_id: string
          vehicle_id: string
        }
        Update: {
          service_area_id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_vehicle_service_areas_service_area_id_foreign"
            columns: ["service_area_id"]
            isOneToOne: false
            referencedRelation: "service_areas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_vehicle_service_areas_vehicle_id_foreign"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          }
        ]
      }
      company_vehicle_service_zones: {
        Row: {
          service_zone_id: string
          vehicle_id: string
        }
        Insert: {
          service_zone_id: string
          vehicle_id: string
        }
        Update: {
          service_zone_id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_vehicle_service_zones_service_zone_id_foreign"
            columns: ["service_zone_id"]
            isOneToOne: false
            referencedRelation: "service_zones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_vehicle_service_zones_vehicle_id_foreign"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          }
        ]
      }
      countries: {
        Row: {
          code: string
          created_at: string | null
          flag: string | null
          id: number
          languages: Json | null
          name: Json
          sort: number
          updated_at: string | null
          wikidata_id: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          flag?: string | null
          id?: number
          languages?: Json | null
          name: Json
          sort?: number
          updated_at?: string | null
          wikidata_id?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          flag?: string | null
          id?: number
          languages?: Json | null
          name?: Json
          sort?: number
          updated_at?: string | null
          wikidata_id?: string | null
        }
        Relationships: []
      }
      country_diallings: {
        Row: {
          country_id: number | null
          created_at: string | null
          dial_code: string | null
          id: number
          international_prefix: string | null
          mask: string | null
          mask_char: string | null
          national_destination_code_lengths: string | null
          national_number_lengths: string | null
          national_prefix: string | null
          prefix: string | null
          updated_at: string | null
        }
        Insert: {
          country_id?: number | null
          created_at?: string | null
          dial_code?: string | null
          id?: number
          international_prefix?: string | null
          mask?: string | null
          mask_char?: string | null
          national_destination_code_lengths?: string | null
          national_number_lengths?: string | null
          national_prefix?: string | null
          prefix?: string | null
          updated_at?: string | null
        }
        Update: {
          country_id?: number | null
          created_at?: string | null
          dial_code?: string | null
          id?: number
          international_prefix?: string | null
          mask?: string | null
          mask_char?: string | null
          national_destination_code_lengths?: string | null
          national_number_lengths?: string | null
          national_prefix?: string | null
          prefix?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "country_diallings_country_id_foreign"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          }
        ]
      }
      currencies: {
        Row: {
          banknotes: Json | null
          coins: Json | null
          created_at: string | null
          id: number
          iso_code: string
          iso_number: string
          name: string
          units: Json | null
          updated_at: string | null
        }
        Insert: {
          banknotes?: Json | null
          coins?: Json | null
          created_at?: string | null
          id?: number
          iso_code: string
          iso_number: string
          name: string
          units?: Json | null
          updated_at?: string | null
        }
        Update: {
          banknotes?: Json | null
          coins?: Json | null
          created_at?: string | null
          id?: number
          iso_code?: string
          iso_number?: string
          name?: string
          units?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      currency_countries: {
        Row: {
          country_id: number | null
          currency_id: number | null
        }
        Insert: {
          country_id?: number | null
          currency_id?: number | null
        }
        Update: {
          country_id?: number | null
          currency_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "currency_countries_country_id_foreign"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "currency_countries_currency_id_foreign"
            columns: ["currency_id"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["id"]
          }
        ]
      }
      locations: {
        Row: {
          address: string | null
          address_complement: string | null
          city_id: number | null
          country_id: number | null
          created_at: string | null
          id: string
          is_primary: boolean
          latitude: string | null
          locationable_id: number
          locationable_type: string
          longitude: string | null
          name: string | null
          phone_number: string | null
          postcode: string | null
          state_id: number | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          address_complement?: string | null
          city_id?: number | null
          country_id?: number | null
          created_at?: string | null
          id: string
          is_primary?: boolean
          latitude?: string | null
          locationable_id: number
          locationable_type: string
          longitude?: string | null
          name?: string | null
          phone_number?: string | null
          postcode?: string | null
          state_id?: number | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          address_complement?: string | null
          city_id?: number | null
          country_id?: number | null
          created_at?: string | null
          id?: string
          is_primary?: boolean
          latitude?: string | null
          locationable_id?: number
          locationable_type?: string
          longitude?: string | null
          name?: string | null
          phone_number?: string | null
          postcode?: string | null
          state_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_city_id_foreign"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "locations_country_id_foreign"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "locations_state_id_foreign"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          batch: number
          id: number
          migration: string
        }
        Insert: {
          batch: number
          id?: number
          migration: string
        }
        Update: {
          batch?: number
          id?: number
          migration?: string
        }
        Relationships: []
      }
      personal_access_tokens: {
        Row: {
          abilities: string | null
          created_at: string | null
          expires_at: string | null
          id: number
          last_used_at: string | null
          name: string
          token: string
          tokenable_id: number
          tokenable_type: string
          updated_at: string | null
        }
        Insert: {
          abilities?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: number
          last_used_at?: string | null
          name: string
          token: string
          tokenable_id: number
          tokenable_type: string
          updated_at?: string | null
        }
        Update: {
          abilities?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: number
          last_used_at?: string | null
          name?: string
          token?: string
          tokenable_id?: number
          tokenable_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      rating_scores: {
        Row: {
          created_at: string | null
          id: string
          rating_id: string | null
          rating_type_id: string | null
          score: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          rating_id?: string | null
          rating_type_id?: string | null
          score?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          rating_id?: string | null
          rating_type_id?: string | null
          score?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rating_scores_rating_id_foreign"
            columns: ["rating_id"]
            isOneToOne: false
            referencedRelation: "ratings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rating_scores_rating_type_id_foreign"
            columns: ["rating_type_id"]
            isOneToOne: false
            referencedRelation: "rating_types"
            referencedColumns: ["id"]
          }
        ]
      }
      rating_types: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          rateable_id: number
          rateable_type: string
          score: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id: string
          rateable_id: number
          rateable_type: string
          score?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rateable_id?: number
          rateable_type?: string
          score?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_user_id_foreign"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      service_areas: {
        Row: {
          created_at: string | null
          id: string
          name: string
          service_zone_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          service_zone_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          service_zone_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_areas_service_zone_id_foreign"
            columns: ["service_zone_id"]
            isOneToOne: false
            referencedRelation: "service_zones"
            referencedColumns: ["id"]
          }
        ]
      }
      service_zones: {
        Row: {
          created_at: string | null
          id: string
          name: string
          ownable_id: number
          ownable_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          ownable_id: number
          ownable_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          ownable_id?: number
          ownable_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      shipments: {
        Row: {
          created_at: string | null
          id: string
          status: string | null
          type: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id: string
          status?: string | null
          type?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          status?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shipments_user_id_foreign"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      states: {
        Row: {
          code: string
          country_id: number | null
          created_at: string | null
          id: number
          name: string | null
          postal: string | null
          updated_at: string | null
        }
        Insert: {
          code: string
          country_id?: number | null
          created_at?: string | null
          id?: number
          name?: string | null
          postal?: string | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          country_id?: number | null
          created_at?: string | null
          id?: number
          name?: string | null
          postal?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "states_country_id_foreign"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          }
        ]
      }
      taxes: {
        Row: {
          cca2: string | null
          cca3: string | null
          country_id: number | null
          created_at: string | null
          generic_label: string | null
          id: number
          name: string
          rates: Json | null
          tax_type: string | null
          updated_at: string | null
          vat_id: string | null
          zone: string | null
        }
        Insert: {
          cca2?: string | null
          cca3?: string | null
          country_id?: number | null
          created_at?: string | null
          generic_label?: string | null
          id?: number
          name: string
          rates?: Json | null
          tax_type?: string | null
          updated_at?: string | null
          vat_id?: string | null
          zone?: string | null
        }
        Update: {
          cca2?: string | null
          cca3?: string | null
          country_id?: number | null
          created_at?: string | null
          generic_label?: string | null
          id?: number
          name?: string
          rates?: Json | null
          tax_type?: string | null
          updated_at?: string | null
          vat_id?: string | null
          zone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "taxes_country_id_foreign"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          }
        ]
      }
      temporary_uploads: {
        Row: {
          created_at: string | null
          id: string
          session_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          session_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          session_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_verifications: {
        Row: {
          birth_date: string | null
          created_at: string | null
          driving_license_number: string | null
          id: string
          name: string | null
          nationality_id: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          birth_date?: string | null
          created_at?: string | null
          driving_license_number?: string | null
          id: string
          name?: string | null
          nationality_id?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          birth_date?: string | null
          created_at?: string | null
          driving_license_number?: string | null
          id?: string
          name?: string | null
          nationality_id?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_verifications_nationality_id_foreign"
            columns: ["nationality_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_verifications_user_id_foreign"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          about: string | null
          avatar_url: string | null
          created_at: string | null
          id: string
          name: string
          phone_number: string | null
          updated_at: string | null
        }
        Insert: {
          about?: string | null
          avatar_url?: string | null
          created_at?: string | null
          id: string
          name: string
          phone_number?: string | null
          updated_at?: string | null
        }
        Update: {
          about?: string | null
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          name?: string
          phone_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      vehicle_capacity_dimensions: {
        Row: {
          created_at: string | null
          height: string | null
          id: string
          length: string | null
          unit: string
          updated_at: string | null
          vehicle_id: string
          width: string | null
        }
        Insert: {
          created_at?: string | null
          height?: string | null
          id: string
          length?: string | null
          unit?: string
          updated_at?: string | null
          vehicle_id: string
          width?: string | null
        }
        Update: {
          created_at?: string | null
          height?: string | null
          id?: string
          length?: string | null
          unit?: string
          updated_at?: string | null
          vehicle_id?: string
          width?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_capacity_dimensions_vehicle_id_foreign"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          }
        ]
      }
      vehicle_capacity_weights: {
        Row: {
          created_at: string | null
          id: string
          unit: string
          updated_at: string | null
          value: string | null
          vehicle_id: string
        }
        Insert: {
          created_at?: string | null
          id: string
          unit?: string
          updated_at?: string | null
          value?: string | null
          vehicle_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          unit?: string
          updated_at?: string | null
          value?: string | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_capacity_weights_vehicle_id_foreign"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          }
        ]
      }
      vehicle_fuel_information: {
        Row: {
          created_at: string | null
          fuel_capacity: number | null
          fuel_type: string | null
          id: string
          liter_per_km_in_city: number | null
          liter_per_km_in_highway: number | null
          liter_per_km_mixed: number | null
          updated_at: string | null
          vehicle_id: string
        }
        Insert: {
          created_at?: string | null
          fuel_capacity?: number | null
          fuel_type?: string | null
          id: string
          liter_per_km_in_city?: number | null
          liter_per_km_in_highway?: number | null
          liter_per_km_mixed?: number | null
          updated_at?: string | null
          vehicle_id: string
        }
        Update: {
          created_at?: string | null
          fuel_capacity?: number | null
          fuel_type?: string | null
          id?: string
          liter_per_km_in_city?: number | null
          liter_per_km_in_highway?: number | null
          liter_per_km_mixed?: number | null
          updated_at?: string | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_fuel_information_vehicle_id_foreign"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          }
        ]
      }
      vehicle_icons: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      vehicle_information: {
        Row: {
          body_type: string | null
          created_at: string | null
          doors_count: number | null
          id: string
          seats_count: number | null
          steering_wheel: string | null
          top_speed: number | null
          updated_at: string | null
          vehicle_id: string
        }
        Insert: {
          body_type?: string | null
          created_at?: string | null
          doors_count?: number | null
          id: string
          seats_count?: number | null
          steering_wheel?: string | null
          top_speed?: number | null
          updated_at?: string | null
          vehicle_id: string
        }
        Update: {
          body_type?: string | null
          created_at?: string | null
          doors_count?: number | null
          id?: string
          seats_count?: number | null
          steering_wheel?: string | null
          top_speed?: number | null
          updated_at?: string | null
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_information_vehicle_id_foreign"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          }
        ]
      }
      vehicle_makes: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id: string
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      vehicle_models: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          updated_at: string | null
          vehicle_make_id: string
        }
        Insert: {
          created_at?: string | null
          id: string
          name?: string | null
          updated_at?: string | null
          vehicle_make_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
          vehicle_make_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_models_vehicle_make_id_foreign"
            columns: ["vehicle_make_id"]
            isOneToOne: false
            referencedRelation: "vehicle_makes"
            referencedColumns: ["id"]
          }
        ]
      }
      vehicles: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          internal_id: string | null
          ownable_id: number
          ownable_type: string
          plate_number: string | null
          updated_at: string | null
          vehicle_icon_id: string | null
          vehicle_make_id: string | null
          vehicle_model_id: string | null
          VIN_number: string | null
          year: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id: string
          internal_id?: string | null
          ownable_id: number
          ownable_type: string
          plate_number?: string | null
          updated_at?: string | null
          vehicle_icon_id?: string | null
          vehicle_make_id?: string | null
          vehicle_model_id?: string | null
          VIN_number?: string | null
          year?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          internal_id?: string | null
          ownable_id?: number
          ownable_type?: string
          plate_number?: string | null
          updated_at?: string | null
          vehicle_icon_id?: string | null
          vehicle_make_id?: string | null
          vehicle_model_id?: string | null
          VIN_number?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_vehicle_icon_id_foreign"
            columns: ["vehicle_icon_id"]
            isOneToOne: false
            referencedRelation: "vehicle_icons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_vehicle_make_id_foreign"
            columns: ["vehicle_make_id"]
            isOneToOne: false
            referencedRelation: "vehicle_makes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_vehicle_model_id_foreign"
            columns: ["vehicle_model_id"]
            isOneToOne: false
            referencedRelation: "vehicle_models"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      supabase_url: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      company_roles: "owner" | "manager" | "driver" | "member"
    }
    CompositeTypes: {
      media_file: {
        id: string
        uri: string
        file_name: string
        file_type: string
      }
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

