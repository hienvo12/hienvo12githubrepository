﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Snake
{
	public enum Directions {  Up, Down, Left, Right };

	public class Settings
	{
		public static int Width{ get; set; }
		public static int Height { get; set; }
		public static int Speed { get; set; }
		public static int Score { get; set; }
		public static int Points { get; set; }
		public static int Level { get; set; }
		public static bool GameOver { get; set; }
		public static Directions direction { get; set; }

		public Settings()
		{
			Level = 1;
			Width = 16;
			Height = 16;
			Speed = 12;
			Score = 0;
			Points = 100;
			GameOver = false;
			direction = Directions.Down;
		}
	}
}
