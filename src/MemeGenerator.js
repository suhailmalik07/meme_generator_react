import React, {Component} from 'react'

class MemeGenerator extends Component {
  state = {
    topText: "",
    bottomText: "",
    randomImg: "http://i.imgflip.com/1bij.jpg",
    allimg: [],
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response =>{
        const {memes} = response.data
        console.log(memes[0])
        this.setState({allimg: memes})
      })
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({ [name]: value })
    console.log([name])
    console.log(value)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const randNum = Math.floor(Math.random() * this.state.allimg.length)
    const ranMemeImg = this.state.allimg[randNum].url
    this.setState({randomImg: ranMemeImg})
  }

  render() {
    return(
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input type="text" name="topText"  value={this.state.topText} placeholder="Top Text" onChange={this.handleChange}/>
          <input type="text" name="bottomText"  value={this.state.bottomText} placeholder="bottom Text" onChange={this.handleChange}/>
          <button>Gen</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt=""/>
          <h2 className="meme-text" id="top">{this.state.topText}</h2>
          <h2 className="meme-text" id="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    )
  }
}

export default MemeGenerator