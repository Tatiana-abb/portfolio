using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace snakeee
{
    class Menu
    {
        string[] arr;
        int here_axisY;



        public Menu(int axisY, string[] arr)
        {
            Console.ForegroundColor = ConsoleColor.Gray;
            this.arr = arr;
            here_axisY = axisY;

            //рисуем менюшку в столбик с учетом кол-ва эл-ов
            for (int i = 0; i < arr.Length; i++)
            {
                Console.SetCursorPosition(40 - (arr[i].Length / 2), axisY);
                Console.Write(arr[i]);
                axisY = axisY + 3;//надо бы оптимизирвать

            }
            //ставим указатель на первый эл-т
            Pointer(here_axisY, '*');

        }
        
        //функция перехода между пунктами меню
        //function: transition beetween menu`s elements
        public int MenuPointer(ConsoleKeyInfo key)
        {
            if (this.arr.Length== 1)
                return 0;
            switch (key.Key)
            {
                case ConsoleKey.DownArrow:
                    if (here_axisY == 16)
                        break;
                    else
                    {
                        Pointer(here_axisY, ' ');
                        Pointer(here_axisY+3, '*');

                        here_axisY = here_axisY + 3;


                        Console.Beep(2000, 105);//signal
                    }
                    break;

                case ConsoleKey.UpArrow:
                    if (here_axisY == 7)
                        break;
                    else
                    {
                        Pointer(here_axisY, ' ');
                        Pointer(here_axisY- 3, '*');
                        Console.SetCursorPosition(45, here_axisY);

                        here_axisY = here_axisY - 3;

                        Console.Beep(2000,105);
                    }
                    break;
                    //if press Enter
                case ConsoleKey.Enter:
                    if (here_axisY == 7)
                    {
                        Console.Clear();
                        return 1; 
                    }

                        if (here_axisY == 10)
                        {
                            
                            int q;
                            string str1 = "MODE: EASY";
                            string str2 = "MODE: DIFFICULT";
                            string str3 = str1;
                            Console.Clear();
                            Console.SetCursorPosition(57, 23);
                            Console.Write("Press 'Esc' for return");
                            Console.SetCursorPosition(38, 7);
                            Console.Write(str3);
                            ConsoleKeyInfo menuKey;
                            
                            menuKey = Console.ReadKey();
                            bool f = false;
                            do
                            {
                                if (menuKey.Key == ConsoleKey.Enter)
                                {
                                    Console.Clear();
                                    Console.SetCursorPosition(57, 23);
                                    Console.Write("Press 'Esc' for return");
                                    Console.SetCursorPosition(38, 7);
                                    if (str3 == str1)
                                    {
                                        str3 = str2;
                                        Console.Write(str3);
                                        //q = 3;
                                        ConsoleKeyInfo menuKey2;

                                        menuKey2 = Console.ReadKey();
                                        if (menuKey2.Key == ConsoleKey.Escape)
                                            return 3;
                                        else
                                            break;
                                        //break;
                                    }

                                    if (str3 == str2)
                                    {
                                        str3 = str1;
                                        Console.Write(str3);
                                        q = 3;
                                        // break;
                                    }
                                }
                            } while (!f);
                            
                            
                        }
                    else if (here_axisY == 16)
                    {
                        Console.Clear();
                        Console.ForegroundColor = ConsoleColor.Magenta;
                        Console.SetCursorPosition(30, 8);
                        Console.Write("2019 - Сreator: Tanni");
                        Console.SetCursorPosition(30, 9);
                        Console.Write("All rights are patented :Р");
                        Console.ForegroundColor = ConsoleColor.Gray;

                        Console.SetCursorPosition(57, 23);
                        Console.Write("Press 'Esc' for return");

                        ConsoleKeyInfo myKey;
                        myKey = Console.ReadKey();
                        if (myKey.Key == ConsoleKey.Escape)
                        {
                            Console.Clear();
                            Program.mainMenu();
                        }
                            
                        
                    }
                    else if (here_axisY == 13)
                    {
                        Environment.Exit(0);
                    }

                    break;

            }
            return 0;
    }
        //function: Pointer drawing
        private void Pointer(int here_axisY, char p)
        {
            Console.ForegroundColor = ConsoleColor.DarkRed;
            Console.SetCursorPosition(35, here_axisY);
            Console.Write(p);
            Console.SetCursorPosition(44, here_axisY);
            Console.Write(p);
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }
}
