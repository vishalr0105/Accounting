﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class AccessRule
    {
        public Permission Copy { get; set; }

        public Permission Download { get; set; }

        public Permission Write { get; set; }

        public string Path { get; set; }

        public Permission Read { get; set; }

        public string Role { get; set; }

        public Permission WriteContents { get; set; }

        public Permission Upload { get; set; }

        public bool IsFile { get; set; }

        public string Message { get; set; }
    }
}
