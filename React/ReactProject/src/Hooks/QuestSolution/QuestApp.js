import React, { useState } from "react";
import "./quest.css";

function QuestApp() {
  const [quests, setQuests] = useState([]);

  function handleCreate(quest) {
    setQuests(prevState => [...prevState, quest]);
  }

  function handleRemove(title) {
    setQuests(prevState => prevState.filter(q => q.title !== title));
  }

  return (
    <>
      <h1>Quest creator</h1>
      <CreateQuestForm onCreate={handleCreate} />
      <hr />
      {quests.map(quest =>
        <Quest key={quest.title} {...quest} onRemove={handleRemove} />
      )}
    </>
  );
}

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  function handleChange(event) {
    setValue(event.target.value);
  }

  return { value: value, onChange: handleChange };
}

function CreateQuestForm(props) {
  let title = useFormInput("");
  let description = useFormInput("");
  let type = useFormInput("Gather");
  let amount = useFormInput(0);
  let item = useFormInput("");

  function onCreate() {
    props.onCreate({
      title: title.value,
      description: description.value,
      type: type.value,
      amount: amount.value,
      item: item.value
    });
  }

  return (
    <>
      <QuestBasicInfoForm title={title} description={description} />
      <QuestCompletionForm type={type} amount={amount} item={item} />
      <p><button onClick={onCreate} id="btnCreate">Create quest</button></p>
    </>
  );
}

function QuestBasicInfoForm(props) {
  return (
    <>
      <h4>Basic info:</h4>
      <label>Title:</label>
      <input id="title" {...props.title} />
      <label>Description:</label>
      <textarea id="description" {...props.description} />
    </>
  );
}

function QuestCompletionForm(props) {
  return (
    <>
      <h4>Complete conditions: <i>{props.type.value} {props.amount.value} {props.item.value}</i></h4>
      <label>Type:</label>
      <select id="type" {...props.type}>
        <option>Gather</option>
        <option>Kill</option>
      </select>
      <label>Amount:</label>
      <input id="amount" {...props.amount} type="number" />
      <label>Item/NPC:</label>
      <input id="item" {...props.item} />
    </>
  );
}

function Quest(props) {
  function onClick() {
    props.onRemove(props.title);
  }

  return (
    <div className="quest">
      <button onClick={onClick} className="btnRemoveQuest"><small>x</small></button>
      <div className="questTitle">{props.title}</div>
      <hr />
      <p><small>{props.type} {props.amount} {props.item}</small></p>
      <h5>Description</h5>
      <div className="questContent">{props.description}</div>
    </div>
  );
}

export default QuestApp