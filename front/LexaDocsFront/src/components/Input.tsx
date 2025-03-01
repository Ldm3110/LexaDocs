import React, { useState, useRef } from "react"

type InputProps = {
  label: string;
  type: string
  onInput?: () => void;
  handleValue?: (value: string) => void;
  inputRef?: React.RefObject<null>
}

export function Input({ label, type, onInput, inputRef }: InputProps) {

  return <>
    <div className="text-center">
      <label className="form-label text-center" htmlFor="username">{label}</label>
      <input ref={inputRef} className="form-control" type={type} name="username" onInput={onInput} />
    </div>
  </>
}

export default Input