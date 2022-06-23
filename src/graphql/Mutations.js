import {gql} from '@apollo/client'

export const CREATE_USER_MUTATION = gql`
	mutation createUser($input: CreateUserInput!) {
		createUser(input: $input) {
    		name
    		email
  		}
	}

`
export const LOGIN_MUTATION = gql`
	mutation login($input: Credential!){
		login(input: $input) {
    		accessToken
 		}
	}
`

export const CREATE_FLASHCARD_MUTATION = gql`
	mutation createFlashcard($input: CreateFlashcardInput!){
  		createFlashcard(input: $input) {
    		title
  		}
	}
`