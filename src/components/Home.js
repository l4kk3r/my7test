import React, {useEffect, useState} from 'react'
import { Document, Page } from 'react-pdf';

import './styles.css'

const Home = () => {
    const [tasks, setTasks] = useState([])
    const [customtask, setCustomTask] = useState([])
    const [checkedTasks, setCheckedTasks] = useState([])
    const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

    useEffect(()=>{
        fetch('https://tasks52.herokuapp.com/all-tasks',{method: "get", headers: {"mode":"no-cors", "Access-Control-Allow-Origin": "*"}}).then(ans=> ans.json()).then(realans=> setTasks(realans.tasks))
    }, [])

    const handleTask = (e) => {
        if (e.target.checked) {
            setCheckedTasks(old=>[...old, e.target.value])
        } else {
            deleteTask(e.target.value)
        }
    }

    const deleteTask = (neededtask) => {
        setCheckedTasks(checkedTasks.filter(item => item !== neededtask))
    }

    const addCustom = () => {
        setTasks(old=>[...old, customtask])
        setCheckedTasks(old=>[...old, customtask])
        setCustomTask("")
    }

    const openCart = () => {
        document.getElementById('openCart').style.display = 'none'
        document.getElementById('theCart').style.display = 'block'
        document.getElementById('closeCart').style.display = 'block'
    }

    const closeCart = () => {
        document.getElementById('openCart').style.display = 'block'
        document.getElementById('theCart').style.display = 'none'
        document.getElementById('closeCart').style.display = 'none'
    }

    return (
        <div className='root'>
            <Document
        file="somefile.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
            <div class='tasks-field'>
                <div class='leftside'>
                  {tasks.map((task, i) => {return <div><input type='checkbox' checked={checkedTasks.includes(task) ? true : false} onChange={(e) => handleTask(e)} class='totask' id={i} name='alltasks' value={task} /><label for={i}>{task}</label></div>})}
                  <input type='text' value={customtask} onChange={(e) => setCustomTask(e.target.value)} onKeyPress={event => {
                    if (event.key === 'Enter') {
                        addCustom()
                    }
                    }} placeholder='Cвоё задание' />
                    <button class='add-custom-b' onClick={() => addCustom()}>+</button>
                </div>
                <div class='rightside'>
                   {checkedTasks.map((task, i) => {return <div class='choosen-task'><h3>{task}</h3><button class='remove-button' onClick={() => deleteTask(task)}>Удалить</button></div>})}
                   <div class='conwrapper'><button onClick={() => console.log('hhh')} disabled={checkedTasks.length === 3 ? false : true} class='confirm-button'>Подтвердить</button></div>
                </div>
                <div class='rightside-mobile'>
                    <button id='openCart' onClick={() => openCart()} class='open-cart'>Открыть</button>
                    <div id='theCart' style={{display: 'none'}} class='mobctask'><div class='cart-content'><button style={{display: 'none'}} id='closeCart' onClick={() => closeCart()}>Скрыть</button>{checkedTasks.map((task, i) => {return <div class='inmobctask'><h3>{task}</h3><button class='mob-rb' onClick={() => deleteTask(task)}>Удалить</button></div>})}</div></div>
                </div>
            </div>
            <div class='statusbar'>
                <h3>{checkedTasks.length} / 3</h3>
                <p>Выбрано</p>
            </div>
        </div>

    )
}
export default Home;