﻿using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tic_Tac_Toe
{
	class CImageBase : IDisposable
	{
		bool disposed = false;

		Bitmap _bitmap;
		private int X;
		private int Y;

		public int Left { get { return X; } set { X = value; } }
		public int Top { get { return Y; } set { Y = value; } }

		public CImageBase(Bitmap _resource)
		{
			_bitmap = new Bitmap(_resource);
		}

		public void DrawImage(Graphics gfx)
		{
			gfx.DrawImage(_bitmap, X, Y);
		}
		public void Dispose()
		{
			Dispose(true);
			GC.SuppressFinalize(this);
		}

		protected virtual void Dispose(bool dispossing)
		{
			if (disposed)
				return;
			if (dispossing)
				_bitmap.Dispose();

			disposed = true;
		}

	}
}
