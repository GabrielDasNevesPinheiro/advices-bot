import axios from "axios";
import { Client, Message, TextChannel } from "discord.js";


export default class Bot {
  client: Client;//atributos da classe Bot

  constructor(client: Client) {
    this.client = client;
    this.initSystem();
  }

 private initSystem() {

    this.client.on("messageCreate", async (msg) => {
        let advice: {id: number, advice: string};
        if (msg.content.includes(`<@${this.client.application.id}>`)) {
           advice = await axios.get("https://api.adviceslip.com/advice").then((response) => {
            return response.data.slip;
          });

          const channel = msg.channel as TextChannel;

          channel.send(`<@${msg.author.id}> ${advice.advice}`);
        }

    });

  }
}
