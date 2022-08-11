namespace Terrasoft.Configuration.UsrGroupSectionService
{
    using System;
    using System.ServiceModel;
    using System.ServiceModel.Web;
    using System.ServiceModel.Activation;
    using Terrasoft.Core;
	using Terrasoft.Core.DB;
    using Terrasoft.Web.Common;
    using Terrasoft.Core.Entities; 
    [ServiceContract]
    [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
    public class UsrGroupSectionService: BaseService
    {
        /* Метод веб-сервиса. */
        [OperationContract]
        [WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped,
        ResponseFormat = WebMessageFormat.Json)]
        public string SomeMethod(string Code) {
            
			
			
			/*
              var groupSectionQuery = new Select(UserConnection)
                .Column("Id")
                .From("UsrSwim")
                .Where("UsrSwimCode")
                    .IsEqual(Column.Parameter(Code))
                as Select;
            Guid id = groupSectionQuery.ExecuteScalar<Guid>();
            if (id==Guid.Empty) {
                return "-1";
            }
			*/
			
			Guid id;
			var esq1 = new EntitySchemaQuery(UserConnection.EntitySchemaManager,"UsrSwim");
			var colID = esq1.AddColumn("Id");
			var colCODE = esq1.AddColumn("UsrSwimCode");
			var esq1equal = esq1.CreateFilterWithParameters(FilterComparisonType.Equal, "UsrSwimCode", Code); 
			esq1.Filters.Add(esq1equal);
			var entities = esq1.GetEntityCollection(UserConnection);
			if (entities.Count<1)
			{
			return "-1";
			}
			id = entities[0].GetTypedColumnValue<Guid>(colID.Name);
			
			
			
			var result = "";
			int temp_res = 0;
			var esq = new EntitySchemaQuery(UserConnection.EntitySchemaManager,"UsrSwimSession");
			var colDATE = esq.AddColumn("UsrSwimDate");
			var colPRGRM = esq.AddColumn("UsrSwimProgramm");
			var colINTEGER = esq.AddColumn("UsrInteger1");
			var esqDate = esq.CreateFilterWithParameters(FilterComparisonType.Greater, "UsrSwimDate", DateTime.Now); 
			esq.Filters.Add(esqDate);
			var esqId = esq.CreateFilterWithParameters(FilterComparisonType.Equal, "UsrSwimProgramm", id);
			esq.Filters.Add(esqId);
			entities = esq.GetEntityCollection(UserConnection);
			int i = entities.Count;
			int s = 0;
			while (s<i)
			{
				result = entities[s].GetColumnValue(colINTEGER.Name).ToString();
				temp_res = temp_res + int.Parse(result);
				s++;
			}
			
			
			
			string res=temp_res.ToString();
			return res;
			
			
			
			
			
			
			
			
			/*
            var countQuery = "select sum(UsrInteger1) from UsrSwimSession where UsrSwimDate>getdate() AND UsrSwimProgrammId=@swimid;";
			var query=new CustomQuery(UserConnection, countQuery);
			query.Parameters.Add("@swimid", id);
			var res1 = query.ExecuteScalar<int>();
			string res=res1.ToString();
            return res;
			*/
        }
    }
}