import {createElement,useState,useEffect,useContext,useRef,useReducer} from 'react'
import cn from 'classnames'
import BoxContext from './BoxContext'
import parseColor from 'parse-color'
h = createElement

Separator = (props)->
	h 'div',
		className: 'ed-separator'
		

export default Separator