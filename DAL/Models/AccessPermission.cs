using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class AccessPermission
    {
        //
        // Summary:
        //     Gets or sets access to copy a file or folder.
        public bool Copy { get; set; } = true;


        //
        // Summary:
        //     Gets or sets permission to download a file or folder.
        public bool Download { get; set; } = true;


        //
        // Summary:
        //     Gets or sets permission to write a file or folder.
        public bool Write { get; set; } = true;


        //
        // Summary:
        //     Gets or sets permission to write the content of folder.
        public bool WriteContents { get; set; } = true;


        //
        // Summary:
        //     Gets or sets access to read a file or folder.
        public bool Read { get; set; } = true;


        //
        // Summary:
        //     Gets or sets permission to upload to the folder.
        public bool Upload { get; set; } = true;


        //
        // Summary:
        //     Gets or sets the access message.
        public string Message { get; set; } = string.Empty;

    }
}
