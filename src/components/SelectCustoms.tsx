import React, {useEffect, useState} from 'react';
import Select from "react-select/base";
import {Badge, BadgeVariant, BadgeWithTitle} from "./Badge";
import {StylesConfig} from "react-select";


export interface IValueSelect {
  value?: string;
  label?: any;

}

interface IPropsValueSelect {
  setValuePriority?: any,
  valuePriority?: IValueSelect,
}


export const SelectCustoms = ({setValuePriority, valuePriority}: IPropsValueSelect) => {

  const optionsListPriority: IValueSelect[] = [
    {label: <BadgeWithTitle variant={BadgeVariant.VERY_HIGH}/>, value: "very-high"},
    {label: <BadgeWithTitle variant={BadgeVariant.HIGH}/>, value: "high"},
    {label: <BadgeWithTitle variant={BadgeVariant.MEDIUM}/>, value: "normal"},
    {label: <BadgeWithTitle variant={BadgeVariant.LOW}/>, value: "low"},
    {label: <BadgeWithTitle variant={BadgeVariant.VERY_LOW}/>, value: "very-low"},
  ]


  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [inputSelectKeyboard, setInputSelectKeyboard] = useState<string>('');
  const [newData, setNewData] = useState<IValueSelect>({
    value: 'very-high',
    label: <BadgeWithTitle variant={BadgeVariant.VERY_HIGH}/>,
  });


  //TODO : ININITE LOOPING DSNI

  // useEffect(() => {
  //     setValuePriority(newData)
  // }, [newData])

  useEffect(() => {
    if (valuePriority?.value) {
      setNewData(valuePriority)
    } else {
      setNewData({
        value: 'very-high',
        label: <BadgeWithTitle variant={BadgeVariant.VERY_HIGH}/>,
      })
    }
  }, [valuePriority])

  const stylesConfig: StylesConfig<any, any, any> = {
    option: (base, state) => ({
      ...base,
      // eslint-disable-next-line no-nested-ternary
      backgroundColor: state.isSelected
        ? '#dadada'
        : state.isFocused
          ? '#FAE8FF'
          : '#fff',
      cursor: 'pointer',
      paddingTop: 10,
      paddingBottom: 10,
    }),
  };
  return (
    <div>
      <Select
        styles={stylesConfig}
        onMenuClose={() => setMenuIsOpen(false)}
        onMenuOpen={() => setMenuIsOpen(true)}
        menuIsOpen={menuIsOpen}
        onChange={(newValue: any) => {
          setNewData({
            value: newValue.value,
            label: newValue.label
          })
        }}
        options={optionsListPriority}
        inputValue={inputSelectKeyboard}
        value={newData}
        onInputChange={(e) => setInputSelectKeyboard(e)}
      />
    </div>
  )
}