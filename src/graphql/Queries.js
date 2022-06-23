import {gql} from '@apollo/client'

export const USERS = gql`
	query {
		users {
			id
			name
			email
		}
	}

`

export const USER_FLASHCARD = gql`
	query getUserFlashcard($order: SortBy){
  		userFlashcards(order: $order) {
    		id
    		title
    		description
    		isDone
    		user {
      			id
      			name
    		}
		}
  	}

`
